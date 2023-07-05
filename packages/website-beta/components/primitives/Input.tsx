import MainContent from '@/components/skeleton/MainContent'
import MainFooter from '@/components/skeleton/MainFooter'
import MainHeader from '@/components/skeleton/MainHeader'
import MainLayout from '@/components/skeleton/MainLayout'

export default function Input({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <MainHeader />
      <MainContent>{children}</MainContent>
      <MainFooter>Footer</MainFooter>
    </MainLayout>
  )
}
