import MainContent from '@/components/skeleton/MainContent'
import MainFooter from '@/components/skeleton/MainFooter'
import MainHeader from '@/components/skeleton/MainHeader'
import MainLayout from '@/components/skeleton/MainLayout'

export default function DefaultLayout({
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
      <MainFooter>Footer</MainFooter>
    </MainLayout>
  )
}
