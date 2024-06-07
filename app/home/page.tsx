import RightSide from '@/components/RightSide'
import LeftSideBar from '../../components/LeftSideBar'
import MiddlePart from '../../components/MiddlePart'
export default function page() {

  return (
<div className='flex '>
  <LeftSideBar></LeftSideBar>
 <MiddlePart></MiddlePart>
    <RightSide></RightSide>

</div> 

  )
}  
 

