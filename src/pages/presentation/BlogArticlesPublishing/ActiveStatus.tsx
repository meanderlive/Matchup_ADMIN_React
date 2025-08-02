
 

import COLORS from "../../../common/data/enumColors";
import { TColor } from "../../../type/color-type";

 

export interface IEventStatus {
	[key: string]: { name: string; value:any,color: TColor };
}
const ActiveUser: IEventStatus = {
	Active: { name: 'Published', value:true,color: COLORS.SUCCESS.name },
	Inactive: { name: 'Unpublished',value:false, color: COLORS.WARNING.name },
	 
};
export default ActiveUser;
