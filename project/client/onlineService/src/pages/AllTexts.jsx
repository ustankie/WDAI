import AllTextsContent from '../components/AllTextsContent'
import { Card } from 'react-bootstrap'


export default function AllTexts() {


  return (
    <div className='pageComponent'>
      <div className='title-photo'>
        <h1>All texts on blog</h1>
        <p>Have fun reading!</p>
      </div>
      <Card className='pageCard'>
        <AllTextsContent />
      </Card>
    </div>
  )
}