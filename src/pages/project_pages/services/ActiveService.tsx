
 

import COLORS from "../../../common/data/enumColors";
import { TColor } from "../../../type/color-type";

 

export interface IEventStatus {
	[key: string]: { name: string; value:any,color: TColor };
}
const ActiveService: IEventStatus = {
	Active: { name: 'Active', value:true,color: COLORS.SUCCESS.name },
	Inactive: { name: 'Inactive',value: false, color: COLORS.WARNING.name },
};
export default ActiveService;
