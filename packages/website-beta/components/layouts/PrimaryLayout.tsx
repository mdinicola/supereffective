import MainContent from './primary/MainContent'
import MainHeader from './primary/MainHeader'
import MainLayout from './primary/MainLayout'

export default function PrimaryLayout({
  children,
  menuTitle,
}: {
  children: React.ReactNode
  menuTitle?: React.ReactNode
}) {
  return (
    <MainLayout>
      <MainHeader menuTitle={menuTitle} />
      <MainContent>{children}</MainContent>
      {/* <MainFooter>Footer</MainFooter> */}
    </MainLayout>
  )
}
