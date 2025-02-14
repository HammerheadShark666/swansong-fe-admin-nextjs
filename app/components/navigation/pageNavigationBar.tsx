import AlbumSearchDrawer from "../searchDrawer/searchDrawer";
import { getActionLabel, getModeLabel } from "@/app/lib/generalHelper";
import AddButton from "./addButton";
import { ACTION, MODE } from "@/app/lib/enums";
import DeleteButton from "./deleteButton";

interface IProps {  
  mode: MODE;
  action: ACTION;
  id?: number;
}

export default function PageNavigationBar({mode, action, id}: IProps) {
 
  const modeLabel = getModeLabel(mode);
  const actionLabel = getActionLabel(action);

  return (    
    <div className="flex justify-between h-10">      
      <span className="text-2xl text-white pt-2 mb-2">{actionLabel} {modeLabel}</span>      
      <div className="grid-row gap-2 flex justify-end mt-1 mb-1"> 
      {(mode === MODE.LOOKUPS) ? (<></>) : (<>
        {(id !== null && id !== undefined) ? (<DeleteButton mode={mode} id={id}></DeleteButton> ) : (<></>)}
        <AddButton mode={mode}></AddButton>
        <AlbumSearchDrawer action={action} mode={mode} />       
        </>)}
      </div> 
    </div> 
  );
};