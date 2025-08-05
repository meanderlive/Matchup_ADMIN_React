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


 const store = configureStore({

    reducer: {
        
        user:UserManagement_slice,
        mode:Modes_Slice,
        subscription:SubscriptionPlans_Slice,
        faq:FaqSlice,
        BlogArticlesPublishing:BlogArticlesPublishingSlice,

        rating:RatingSlice,
        auth:AuthSlice,
        Subscription:SubscriptionSlice,
        interest:IntersetSlice,
        activity:ActivitySlice,
        Pet:PetsManagement,
        compatibility:CompatibilitySlice,
        TermsAndConditions:TermsAndConditionsSlice,
        PrivecyPolicys:PrivecyPolicysSlice
    },

})
export default store