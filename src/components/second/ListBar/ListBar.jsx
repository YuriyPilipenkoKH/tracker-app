import { StyledListBar, SortBtns } from "./ListBar.styled"
import { toggleSortId,  toggleSortName, toggleSortNUmber } from "redux/sortSlice"
import { useDispatch} from "react-redux"
import { useLanguage } from "hooks/useLanguage"

const ListBar = () => {
  const lang = useLanguage()
  const dispatch = useDispatch()

    const sortById = () =>{   
        dispatch(toggleSortId()) 
    }

    const sortByName = () =>{
        dispatch(toggleSortName()) 
    }

    const sortByNumber = () =>{
        dispatch(toggleSortNUmber()) 
    }


  return (
    <StyledListBar>
        <SortBtns onClick={sortById}>id</SortBtns>
        <SortBtns onClick={sortByName}> {lang.sname} </SortBtns>
        <SortBtns onClick={sortByNumber}> {lang.phone} </SortBtns>
    </StyledListBar>
  )
}

export default ListBar