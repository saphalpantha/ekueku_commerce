import Banner from '@/components/Banner/Banner'
import GridView from '@/components/Grid/Grid'
import NavD from '@/components/Header/NavD'
import NewsLetter from '@/components/Newsletter/NewsLetter'

export default function Home() {
  return (
    <div>
      <Banner/>
      <GridView/>
      <NewsLetter/>
    </div>
  )
}
