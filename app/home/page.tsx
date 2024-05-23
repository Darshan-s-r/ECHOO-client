import LeftSideBar from '../../components/LeftSideBar'
import MiddlePart from '../../components/MiddlePart'
export default function page() {

  return (
<div className='flex '>
  <LeftSideBar></LeftSideBar>
 <MiddlePart></MiddlePart>
  <div className=' flex-1 max-w-[530px] max-xl:hidden p-5'>
    
  </div>
</div> 

  )
}  
 

