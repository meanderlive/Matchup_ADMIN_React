
 

import COLORS from "../../../common/data/enumColors";
import { TColor } from "../../../type/color-type";

 

export interface IEventStatus {
	[key: string]: { name: string; value:any,color: TColor };
}
const ActiveUser: IEventStatus = {
	Active: { name: 'Active', value:"Active",color: COLORS.SUCCESS.name },
	Inactive: { name: 'Inactive',value:'Inactive', color: COLORS.WARNING.name },
	Block: { name: 'Block', value:"Blocked",color: COLORS.DANGER.name },
};
export default ActiveUser;
