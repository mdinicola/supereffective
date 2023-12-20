import AnnouncementBanner from './panels/AnnouncementBanner'

export function TemporaryAnnouncementBanners() {
  return (
    <>
      <AnnouncementBanner startDate="2023-12-20" endDate="2024-01-20" dismissable>
        The site has been updated to support the new Pokémon introduced in the Indigo Disk 💿✨!{' '}
      </AnnouncementBanner>
    </>
  )
}
