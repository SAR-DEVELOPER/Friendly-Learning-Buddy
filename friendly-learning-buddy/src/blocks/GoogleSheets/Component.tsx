import React from 'react'

type Props = {
  url: string
  height?: number | null
  caption?: string | null
}

/**
 * Converts a spreadsheet share/edit URL to an embeddable iframe URL.
 *
 * Supports:
 *  - SharePoint /:x:/ share links  → appends action=embedview&wdAllowInteractivity=False
 *  - SharePoint Doc.aspx / embed URLs → ensures embedview + read-only params
 *  - OneDrive personal embed URLs  → passed through as-is
 *  - Google Sheets pubhtml         → passed through as-is
 *  - Google Sheets edit/view       → converted to /edit?rm=minimal
 */
function toEmbedUrl(raw: string): string {
  try {
    const url = new URL(raw)

    // ── OneDrive / SharePoint ────────────────────────────────────────────────
    const isOneDrive =
      url.hostname.includes('onedrive.live.com') ||
      url.hostname.includes('sharepoint.com') ||
      url.hostname.includes('1drv.ms')

    if (isOneDrive) {
      // action=embedview is the ONLY mode Microsoft allows inside iframes.
      // action=default triggers X-Frame-Options SAMEORIGIN and is blocked.
      if (
        url.searchParams.has('em') ||
        url.searchParams.get('action') === 'embedview' ||
        url.searchParams.get('action') === 'default'
      ) {
        url.searchParams.set('action', 'embedview')
        url.searchParams.set('wdAllowInteractivity', 'False')
        url.searchParams.delete('wdInConfigurator')
        return url.toString()
      }

      // SharePoint /:x:/ share link — cannot be embedded in iframe
      // (redirects with X-Frame-Options: DENY). Use Doc.aspx embed URL instead.
      if (/^\/:x[lsw]?:\//.test(url.pathname) || url.pathname.startsWith('/:x:/')) {
        return raw
      }

      // SharePoint Doc.aspx view URL
      if (url.pathname.includes('/Doc.aspx') || url.searchParams.has('sourcedoc')) {
        url.searchParams.set('action', 'embedview')
        url.searchParams.set('wdAllowInteractivity', 'False')
        url.searchParams.delete('wdInConfigurator')
        return url.toString()
      }

      // Other OneDrive URL — use as-is
      return raw
    }

    // ── Google Sheets ────────────────────────────────────────────────────────
    if (url.pathname.includes('/pubhtml')) return raw

    const match = url.pathname.match(/\/spreadsheets\/d\/([^/]+)/)
    if (match) {
      const spreadsheetId = match[1]
      const gidFromHash = url.hash.match(/gid=(\d+)/)?.[1]
      const gidFromQuery = url.searchParams.get('gid')
      const gid = gidFromHash || gidFromQuery

      // Use /edit without rm=minimal so the formula bar is visible.
      // Menu bar (File, Edit, View...) will show but users with View-only
      // permission cannot edit or save changes.
      const embedUrl = new URL(
        `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
      )
      if (gid) embedUrl.searchParams.set('gid', gid)
      return embedUrl.toString()
    }
  } catch {
    // Invalid URL — return as-is
  }
  return raw
}

function isMicrosoftUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url)
    return (
      hostname.includes('sharepoint.com') ||
      hostname.includes('onedrive.live.com') ||
      hostname.includes('1drv.ms')
    )
  } catch {
    return false
  }
}

export const GoogleSheetsEmbed: React.FC<Props> = ({ url, height = 500, caption }) => {
  if (!url) return null

  const embedUrl = toEmbedUrl(url)
  const frameHeight = height ?? 500

  // SharePoint iframes are blocked by sandbox — allow unrestricted for Microsoft domains.
  // Google Sheets and other embeds use a restricted sandbox.
  const sandboxProps = isMicrosoftUrl(url)
    ? {}
    : {
        sandbox:
          'allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-storage-access-by-user-activation',
      }

  return (
    <div className="my-6 w-full">
      <div
        className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm"
        style={{ height: frameHeight }}
      >
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          title={caption || 'Spreadsheet'}
          loading="lazy"
          {...sandboxProps}
        />
      </div>
      {caption && (
        <p className="mt-2 text-sm text-muted-foreground text-center italic">{caption}</p>
      )}
    </div>
  )
}
