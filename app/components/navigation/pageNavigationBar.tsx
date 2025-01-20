import AlbumSearchDrawer from "../searchDrawer/searchDrawer";
import { getActionLabel, getModeLabel } from "@/app/lib/generalHelper";
import AddButton from "./addButton";
import { ACTION, MODE } from "@/app/lib/enums";

interface IProps {  
  mode: MODE;
  action: ACTION;
}

export default function PageNavigationBar({mode, action}: IProps) {
 
  const modeLabel = getModeLabel(mode);
  const actionLabel = getActionLabel(action);

  return (    
    <div className="grid grid-cols-12">      
      <span className="grid-cols-6 col-span-6 text-2xl text-white pt-2 mb-2">{actionLabel} {modeLabel}</span>      
      <div className="grid-cols-6 col-span-6 m-auto w-full flex justify-end mt-1 mb-1">     
        <AddButton mode={mode}></AddButton>
        <AlbumSearchDrawer action={action} mode={mode} />       
      </div> 
    </div> 
  );
};