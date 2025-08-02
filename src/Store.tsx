import { configureStore } from "@reduxjs/toolkit";
import UserManagement_slice from "./redux/Slice/UserManagement_slice";
import Modes_Slice from "./redux/Slice/Modes_Slice";
import SubscriptionPlans_Slice from "./redux/Slice/SubscriptionPlans_Slice";
import FaqSlice from "./redux/Slice/FaqSlice";
import BlogArticlesPublishingSlice from "./redux/Slice/BlogArticlesPublishingSlice";
import RatingSlice from "./redux/Slice/RatingSlice";
import AuthSlice from "./redux/Slice/AuthSlice";
import IntersetSlice from "./redux/Slice/IntersetSlice";
import ActivitySlice from "./redux/Slice/ActivitySlice";
import CompatibilitySlice from "./redux/Slice/CompatibilitySlice";
import PetsManagement from "./redux/Slice/PetsManagement";
import SubscriptionSlice from "./redux/Slice/SubscriptionSlice";
import TermsAndConditionsSlice from './redux/Slice/TermAndConditionSlice'
import PrivecyPolicysSlice from "./redux/Slice/PrivecyPolicysSlice";
import roleSlice from "./redux/Slice/role_Slice";
import Tag_Category_Slice from "./redux/Slice/Tag_Category_Slice ";
import Tag_SubCategory_Slice from "./redux/Slice/Tag_Slice  ";
import Planslice from "./redux/Slice/Plans_Slice";
import Srvices_Slice from "./redux/Slice/Services_Slice";
import Bookings_Slice from "./redux/Slice/Bookings_Slice";
import Payments_Slice from "./redux/Slice/Payments_Slice";
import Preferences_Slice from "./redux/Slice/Preferences_Slice";
import Subscriptions_Slice from "./redux/Slice/Subscriptions_Slice";
import Sub_PlanSlice from "./redux/Slice/SubscriptionPlans_Slice";
import Disconutplan_Slice from "./redux/Slice/DiscountPlans_Slice";
import DemStaff_Slice from "./redux/Slice/Staff_Slice "
import Inventorie_Slice from "./redux/Slice/Inventories_Slice"
const store = configureStore({

    reducer: {

        user: UserManagement_slice,
        mode: Modes_Slice,
        subscription: SubscriptionPlans_Slice,
        faq: FaqSlice,
        BlogArticlesPublishing: BlogArticlesPublishingSlice,
        role: roleSlice,
        rating: RatingSlice,
        auth: AuthSlice,
        Subscription: SubscriptionSlice, 
        interest: IntersetSlice,
        activity: ActivitySlice,
        Pet: PetsManagement,
        compatibility: CompatibilitySlice,
        TermsAndConditions: TermsAndConditionsSlice,
        PrivecyPolicys: PrivecyPolicysSlice,
        TagCategory: Tag_Category_Slice,
        Tag: Tag_SubCategory_Slice,
        Plan: Planslice,
        Service: Srvices_Slice,
        Booking: Bookings_Slice,
        Payment: Payments_Slice,
        Preferences: Preferences_Slice,
        SubScriptions: Subscriptions_Slice,
        Sub_Plan: Sub_PlanSlice,
        Disconut_Plan :Disconutplan_Slice,
        Dem_Staff :DemStaff_Slice,
        Inventorie :Inventorie_Slice,
    },

})
export default store