import React, { lazy, useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import {
	componentPagesMenu,
	dashboardPagesMenu,
	demoPagesMenu,
	gettingStartedPagesMenu,
	pageLayoutTypesPagesMenu,
} from '../menu';
import Login from '../pages/presentation/auth/Login';
import Faq from '../pages/presentation/Faq/Faq';

const modeid = localStorage.getItem('modeid')


const LANDING = {
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/DashboardPage')),
	DASHBOARD_BOOKING: lazy(() => import('../pages/presentation/dashboard/DashboardBookingPage')),
	SUMMARY: lazy(() => import('../pages/presentation/SummaryPage')),
};
const SINGLE = {
	BOXED: lazy(() => import('../pages/presentation/single-pages/SingleBoxedPage')),
	FLUID: lazy(() => import('../pages/presentation/single-pages/SingleFluidPage')),
};
const LIST = {
	BOXED: lazy(() => import('../pages/presentation/demo-pages/ListBoxedPage')),
	FLUID: lazy(() => import('../pages/presentation/demo-pages/ListFluidPage')),
};
const GRID = {
	BOXED: lazy(() => import('../pages/presentation/demo-pages/GridBoxedPage')),
	FLUID: lazy(() => import('../pages/presentation/demo-pages/GridFluidPage')),
};
const EDIT = {
	MODERN: lazy(() => import('../pages/presentation/demo-pages/EditModernPage')),
	BOXED: lazy(() => import('../pages/presentation/demo-pages/EditBoxedPage')),
	FLUID: lazy(() => import('../pages/presentation/demo-pages/EditFluidPage')),
	WIZARD: lazy(() => import('../pages/presentation/demo-pages/EditWizardPage')),
	IN_CANVAS: lazy(() => import('../pages/presentation/demo-pages/EditInCanvasPage')),
	IN_MODAL: lazy(() => import('../pages/presentation/demo-pages/EditInModalPage')),
};
const PRICING = {
	PRICING_TABLE: lazy(() => import('../pages/presentation/pricing/PricingTablePage')),
};

const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};
const APP = {
	PROJECT_MANAGEMENT: {
		PROJECTS_LIST: lazy(
			() => import('../pages/presentation/project-management/ProjectManagementsList'),
		),
		PROJECT: lazy(
			() => import('../pages/presentation/project-management/ProjectManagementsProject'),
		),
	},
	KNOWLEDGE: {
		GRID: lazy(() => import('../pages/presentation/knowledge/KnowledgeGridPage')),
		VIEW: lazy(() => import('../pages/presentation/knowledge/KnowledgeViewPage')),
	},
	SALES: {
		TRANSACTIONS: lazy(() => import('../pages/presentation/sales/TransActionsPage')),
		PRODUCTS: lazy(() => import('../pages/presentation/sales/SalesListPage')),
		PRODUCTS_GRID: lazy(() => import('../pages/presentation/sales/ProductsGridPage')),
		PRODUCTS_VIEW: lazy(() => import('../pages/presentation/sales/ProductViewPage')),
	},
	APPOINTMENT: {
		CALENDAR: lazy(() => import('../pages/presentation/appointment/CalendarPage')),
		EMPLOYEE_LIST: lazy(() => import('../pages/presentation/appointment/EmployeeList')),
		EMPLOYEE_VIEW: lazy(() => import('../pages/presentation/appointment/EmployeePage')),
		APPOINTMENT_LIST: lazy(() => import('../pages/presentation/appointment/AppointmentList')),
	},
	CRM: {
		CRM_DASHBOARD: lazy(() => import('../pages/presentation/crm/CrmDashboard')),
		CUSTOMERS: lazy(() => import('../pages/presentation/crm/CustomersList')),
		CUSTOMER: lazy(() => import('../pages/presentation/crm/Customer')),
	},
	CHAT: {
		WITH_LIST: lazy(() => import('../pages/presentation/chat/WithListChatPage')),
		ONLY_LIST: lazy(() => import('../pages/presentation/chat/OnlyListChatPage')),
	},
};
const PAGE_LAYOUTS = {
	HEADER_SUBHEADER: lazy(() => import('../pages/presentation/page-layouts/HeaderAndSubheader')),
	HEADER: lazy(() => import('../pages/presentation/page-layouts/OnlyHeader')),
	SUBHEADER: lazy(() => import('../pages/presentation/page-layouts/OnlySubheader')),
	CONTENT: lazy(() => import('../pages/presentation/page-layouts/OnlyContent')),
	BLANK: lazy(() => import('../pages/presentation/page-layouts/Blank')),
	ASIDE: lazy(() => import('../pages/presentation/aside-types/DefaultAsidePage')),
	MINIMIZE_ASIDE: lazy(() => import('../pages/presentation/aside-types/MinimizeAsidePage')),
};

const CONTENT = {
	CONTENTS: lazy(() => import('../pages/documentation/content/ContentListPage')),
	TYPOGRAPHY: lazy(() => import('../pages/documentation/content/TypographyPage')),
	IMAGES: lazy(() => import('../pages/documentation/content/ImagesPage')),
	TABLES: lazy(() => import('../pages/documentation/content/TablesPage')),
	FIGURES: lazy(() => import('../pages/documentation/content/FiguresPage')),
};
const FORMS_PAGE = {
	FORMS: lazy(() => import('../pages/documentation/forms/FormsListPage')),
	FORM_GROUP: lazy(() => import('../pages/documentation/forms/FormGroupPage')),
	FORM_CONTROLS: lazy(() => import('../pages/documentation/forms/FormControlsPage')),
	SELECT: lazy(() => import('../pages/documentation/forms/SelectPage')),
	CHECKS_AND_RADIO: lazy(() => import('../pages/documentation/forms/ChecksAndRadioPage')),
	RANGE: lazy(() => import('../pages/documentation/forms/RangePage')),
	INPUT_GROUP: lazy(() => import('../pages/documentation/forms/InputGroupPage')),
	VALIDATION: lazy(() => import('../pages/documentation/forms/ValidationPage')),
	WIZARD: lazy(() => import('../pages/documentation/forms/WizardPage')),
};
const GETTING_STARTED = {
	INSTALLATION: lazy(() => import('../pages/documentation/getting-started/InstallationPage')),
	DEVELOPMENT: lazy(() => import('../pages/documentation/getting-started/DevelopmentPage')),
	FOLDER: lazy(() => import('../pages/documentation/getting-started/FolderStructurePage')),
	BOOTSTRAP: lazy(() => import('../pages/documentation/getting-started/BootstrapVariablesPage')),
	PROJECT: lazy(() => import('../pages/documentation/getting-started/ProjectStructurePage')),
};
const ROUTES = {
	ROUTER: lazy(() => import('../pages/documentation/routes/RouterPage')),
};
const COMPONENTS_PAGE = {
	COMPONENTS: lazy(() => import('../pages/documentation/components/ComponentsListPage')),
	ACCORDION: lazy(() => import('../pages/documentation/components/AccordionPage')),
	ALERT: lazy(() => import('../pages/documentation/components/AlertPage')),
	BADGE: lazy(() => import('../pages/documentation/components/BadgePage')),
	BREADCRUMB: lazy(() => import('../pages/documentation/components/BreadcrumbPage')),
	BUTTON: lazy(() => import('../pages/documentation/components/ButtonPage')),
	BUTTON_GROUP: lazy(() => import('../pages/documentation/components/ButtonGroupPage')),
	CARD: lazy(() => import('../pages/documentation/components/CardPage')),
	CAROUSEL: lazy(() => import('../pages/documentation/components/CarouselPage')),
	COLLAPSE: lazy(() => import('../pages/documentation/components/CollapsePage')),
	DROPDOWN: lazy(() => import('../pages/documentation/components/DropdownsPage')),
	LIST_GROUP: lazy(() => import('../pages/documentation/components/ListGroupPage')),
	MODAL: lazy(() => import('../pages/documentation/components/ModalPage')),
	NAVS_TABS: lazy(() => import('../pages/documentation/components/NavsTabsPage')),
	OFF_CANVAS: lazy(() => import('../pages/documentation/components/OffCanvasPage')),
	PAGINATION: lazy(() => import('../pages/documentation/components/PaginationPage')),
	POPOVERS: lazy(() => import('../pages/documentation/components/PopoversPage')),
	PROGRESS: lazy(() => import('../pages/documentation/components/ProgressPage')),
	SCROLLSPY: lazy(() => import('../pages/documentation/components/ScrollspyPage')),
	SPINNER: lazy(() => import('../pages/documentation/components/SpinnersPage')),
	TABLE: lazy(() => import('../pages/documentation/components/TablePage')),
	TOASTS: lazy(() => import('../pages/documentation/components/ToastsPage')),
	TOOLTIP: lazy(() => import('../pages/documentation/components/TooltipPage')),
};
const UTILITIES = {
	UTILITIES: lazy(() => import('../pages/documentation/utilities/UtilitiesListPage')),
	API: lazy(() => import('../pages/documentation/utilities/ApiPage')),
	BACKGROUND: lazy(() => import('../pages/documentation/utilities/BackgroundPage')),
	BORDERS: lazy(() => import('../pages/documentation/utilities/BordersPage')),
	COLORS: lazy(() => import('../pages/documentation/utilities/ColorsPage')),
	DISPLAY: lazy(() => import('../pages/documentation/utilities/DisplayPage')),
	FLEX: lazy(() => import('../pages/documentation/utilities/FlexPage')),
	FLOAT: lazy(() => import('../pages/documentation/utilities/FloatPage')),
	INTERACTIONS: lazy(() => import('../pages/documentation/utilities/InteractionsPage')),
	OVERFLOW: lazy(() => import('../pages/documentation/utilities/OverflowPage')),
	POSITION: lazy(() => import('../pages/documentation/utilities/PositionPage')),
	SHADOWS: lazy(() => import('../pages/documentation/utilities/ShadowsPage')),
	SIZING: lazy(() => import('../pages/documentation/utilities/SizingPage')),
	SPACING: lazy(() => import('../pages/documentation/utilities/SpacingPage')),
	TEXT: lazy(() => import('../pages/documentation/utilities/TextPage')),
	VERTICAL_ALIGN: lazy(() => import('../pages/documentation/utilities/VerticalAlignPage')),
	VISIBILITY: lazy(() => import('../pages/documentation/utilities/VisibilityPage')),
};
const ICONS = {
	ICONS_LIST: lazy(() => import('../pages/documentation/icons/IconsListPage')),
	ICON: lazy(() => import('../pages/documentation/icons/IconPage')),
	MATERIAL: lazy(() => import('../pages/documentation/icons/MaterialPage')),
};
const CHARTS_PAGE = {
	CHART_LIST: lazy(() => import('../pages/documentation/charts/ChartsListPage')),
	GENERAL_USAGE: lazy(() => import('../pages/documentation/charts/ChartGeneralUsagePage')),
	SPARKLINE: lazy(() => import('../pages/documentation/charts/ChartSparklinePage')),
	LINE: lazy(() => import('../pages/documentation/charts/ChartLinePage')),
	AREA: lazy(() => import('../pages/documentation/charts/ChartAreaPage')),
	COLUMN: lazy(() => import('../pages/documentation/charts/ChartColumnPage')),
	BAR: lazy(() => import('../pages/documentation/charts/ChartBarPage')),
	MIXED: lazy(() => import('../pages/documentation/charts/ChartMixedPage')),
	TIMELINE: lazy(() => import('../pages/documentation/charts/ChartTimelinePage')),
	CANDLESTICK: lazy(() => import('../pages/documentation/charts/ChartCandlestickPage')),
	BOX_WHISKER: lazy(() => import('../pages/documentation/charts/ChartBoxWhiskerPage')),
	PIE_DONUT: lazy(() => import('../pages/documentation/charts/ChartPieDonutPage')),
	RADAR: lazy(() => import('../pages/documentation/charts/ChartRadarPage')),
	POLAR: lazy(() => import('../pages/documentation/charts/ChartPolarPage')),
	RADIAL_BAR: lazy(() => import('../pages/documentation/charts/ChartRadialBarPage')),
	BUBBLE: lazy(() => import('../pages/documentation/charts/ChartBubblePage')),
	SCATTER: lazy(() => import('../pages/documentation/charts/ChartScatterPage')),
	HEAT_MAP: lazy(() => import('../pages/documentation/charts/ChartHeatMapPage')),
	TREE_MAP: lazy(() => import('../pages/documentation/charts/ChartTreeMapPage')),
};
const EXTRA = {
	NOTIFICATION: lazy(() => import('../pages/documentation/extras/NotificationPage')),
	HOOKS: lazy(() => import('../pages/documentation/extras/HooksPage')),
};


// const TEST ={
// 	TEST:lazy(()=>import('../pages/presentation/test/test'))
// };
const ADMIN_PROFILE = {
	ADMIN_PROFILE: lazy(() => import('../pages/presentation/AdminProfile/AdminProfile')),


}
const MANAGEMENT = {
	USER_MANAGEMENT: lazy(() => import('../pages/project_pages/user_management/user_management')),
	USER_MANAGEMENT_VIEW: lazy(() => import('../pages/project_pages/user_management/User_view_customer')),
	ADMIN_MANAGEMENT: lazy(() => import('../pages/project_pages/Admin/Admin_management')),
	ADMIN_MANAGEMENT_VIEW: lazy(() => import('../pages/project_pages/Admin/View_Admin')),
	PROVIDER_MANAGEMENT: lazy(() => import('../pages/project_pages/Providers/Provider_management')),
	PROVIDER_MANAGEMENT_VIEW: lazy(() => import('../pages/project_pages/Providers/View_Provider')),
	FINANCEADMIN_MANAGEMENT: lazy(() => import('../pages/project_pages/Finance_Admin/Finance_Admin')),
	FINANCEADMIN_MANAGEMENT_VIEW: lazy(() => import('../pages/project_pages/Finance_Admin/View_FinanceAdmin')),
	SERVICEADMIN_MANAGEMENT: lazy(() => import('../pages/project_pages/Service_Admin/Service_Admin')),
	SERVICEADMIN_MANAGEMENT_VIEW: lazy(() => import('../pages/project_pages/Service_Admin/View_ServiceAdmin')),
	DRIVER_MANAGEMENT: lazy(() => import('../pages/project_pages/Driver/Driver_management')),
	DRIVER_MANAGEMENT_VIEW: lazy(() => import('../pages/project_pages/Driver/View_Driver'))
}

const SERVICE_MANAGEMENT = {
	SERVICE_MANAGEMENT: lazy(() => import('../pages/project_pages/services/service_management')),
	SERVICE_MANAGEMENT_VIEW: lazy(() => import('../pages/project_pages/services/service_view_customer')),



}
const OFFERINGS = {
	OFFERINGS: lazy(() => import('../pages/project_pages/plans/plans')),
	OFFERINGS_VIEW: lazy(() => import('../pages/project_pages/plans/plans_view')),
}

const BOOKINGS = {
	BOOKING: lazy(() => import('../pages/project_pages/bookings/bookings')),
	BOOKING_VIEW: lazy(() => import('../pages/project_pages/bookings/booking_view')),
}

const REVIEWS = {
	REVIEWS: lazy(() => import('../pages/project_pages/Reviews/reviews')),
	REVIEWS_VIEW: lazy(() => import('../pages/project_pages/Reviews/reviews_view')),
}

const INVENTORIES = {
	INVENTORIES: lazy(() => import('../pages/project_pages/Inventories/Inventories')),
	INVENTORIES_VIEW: lazy(() => import('../pages/project_pages/Inventories/Inventories_view')),
}

const TRANSACTION = {
	TRANSACTION: lazy(() => import('../pages/project_pages/Transaction/transactions')),
	TRANSACTION_VIEW: lazy(() => import('../pages/project_pages/Transaction/transaction_view')),
}

const PAYMENTS = {
	PAYMENT: lazy(() => import('../pages/project_pages/payments/payments')),
	PAYMENT_VIEW: lazy(() => import('../pages/project_pages/payments/payment_view')),
}

const PREFERENCES = {
	PREFERENCES: lazy(() => import('../pages/project_pages/preferences/preferences')),
	PREFERENCE_VIEW: lazy(() => import('../pages/project_pages/preferences/preferences_view')),
}

const SUBSCRIPTION_PLAN = {
	SUBSCRIPTIONPLAN: lazy(() => import('../pages/project_pages/subscriptions_Plan/subscriptionsplan')),
	SUBPLANVIEW: lazy(() => import('../pages/project_pages/subscriptions_Plan/subplanview')),
}

const SUBSCRIPTIONS = {
	SUBSCRIPTION: lazy(() => import('../pages/project_pages/subscriptionsdetails/subscriptions')),
	SUBSCRIPTIONVIEW: lazy(() => import('../pages/project_pages/subscriptionsdetails/sububscriptionview')),
}

const DEMANDINGSTAFF = {
	DEMANDINGSTAFF: lazy(() => import('../pages/project_pages/demandingStaff/demandingStaff')),
	DEMANDINGSTAFFVIEW: lazy(() => import('../pages/project_pages/demandingStaff/staff_view')),
}

const DISCOUNTPLANS = {
	DISCOUNTPLANS: lazy(() => import('../pages/project_pages/discountedplan/discountplans')),
	DISCOUNTPLANSVIEW: lazy(() => import('../pages/project_pages/discountedplan/discountplans view')),
}


const REPORTS = {
	compatibility_quizzes: lazy(() => import('../pages/presentation/Compatibility_Quizzes/Compatibility_quizzes')),
	Customer_Loyality: lazy(() => import('../pages/presentation/Search_filter_customization/Search_filter_List'))


}

const SUBSCRIPTION = {
	SUBSCRIPTION: lazy(() => import('../pages/presentation/Subscription_plans/Subscription_list')),

	FINANCIALREPORTING: lazy(() => import('../pages/presentation/Financial Management/FinancialReporting'))
}
const INTEREST = {
	INTEREST: lazy(() => import('../pages/presentation/Interest/my_interest'))
}

const CONTENT_MANAGEMENT = {
	FAQ: lazy(() => import('../pages/presentation/Faq/Faq')),
	COMMUNITYQUIDELINES: lazy(() => import('../pages/presentation/Community_guidelines/CommunityGuidelines')),
	BLOG: lazy(() => import('../pages/presentation/BlogArticlesPublishing/BlogArticlesPublishing')),
	MEDIALIBRARYMANAGEMENT: lazy(() => import('../pages/presentation/MediaLibraryManagement/MediaLibraryManagement'))
}
const SUPPORT_HELP_DESK = {
	SUPPORT_HELP_DESK: lazy(() => import('../pages/presentation/SupportHelpDesk/SupportHelpDesk')),

}
const SERVICES = {
	SERVICE: lazy(() => import('../pages/presentation/Common_page/tag_Category/tag_category'))
}
const SERVICESROLE = {
	SERVICEROLE: lazy(() => import('../pages/presentation/Common_page/Tags/tags'))
}

const MODES = {
	MODES: lazy(() => import('../pages/presentation/Common_page/modes/modes'))
}
const ROLES = {
	ROLES: lazy(() => import('../pages/presentation/Common_page/Role/Roles'))
}

const PERMISSIONS = {
	PERMISSIONS: lazy(() => import('../pages/presentation/Common_page/Permissions/Permissions'))
}
const presentation: RouteProps[] = [

	// USER_MANAGEMENT
	{
		path: dashboardPagesMenu.management.subMenu.user_management.path,
		element: <MANAGEMENT.USER_MANAGEMENT />
	},
	{
		path: dashboardPagesMenu.management.subMenu.user_management.path + '/view/:id',
		element: <MANAGEMENT.USER_MANAGEMENT_VIEW />
	},
	{
		path: dashboardPagesMenu.management.subMenu.Admin_management.path,
		element: <MANAGEMENT.ADMIN_MANAGEMENT />
	},
	{
		path: dashboardPagesMenu.management.subMenu.Admin_management.path + '/view/:id',
		element: <MANAGEMENT.ADMIN_MANAGEMENT_VIEW />
	},
	{
		path: dashboardPagesMenu.management.subMenu.Finance_management.path,
		element: <MANAGEMENT.FINANCEADMIN_MANAGEMENT />
	},
	{
		path: dashboardPagesMenu.management.subMenu.Finance_management.path + '/view/:id',
		element: <MANAGEMENT.FINANCEADMIN_MANAGEMENT_VIEW />
	},
	{
		path: dashboardPagesMenu.management.subMenu.Service_management.path,
		element: <MANAGEMENT.SERVICEADMIN_MANAGEMENT />
	},
	{
		path: dashboardPagesMenu.management.subMenu.Service_management.path + '/view/:id',
		element: <MANAGEMENT.SERVICEADMIN_MANAGEMENT_VIEW />
	},
	{
		path: dashboardPagesMenu.management.subMenu.Provider_management.path,
		element: <MANAGEMENT.PROVIDER_MANAGEMENT />
	},
	{
		path: dashboardPagesMenu.management.subMenu.Provider_management.path + '/view/:id',
		element: <MANAGEMENT.PROVIDER_MANAGEMENT_VIEW />
	},
	{
		path: dashboardPagesMenu.management.subMenu.Driver_management.path,
		element: <MANAGEMENT.DRIVER_MANAGEMENT />
	},
	{
		path: dashboardPagesMenu.management.subMenu.Driver_management.path + '/view/:id',
		element: <MANAGEMENT.DRIVER_MANAGEMENT_VIEW />
	},
	{
		path: `/admin-profile/:id`,
		element: <ADMIN_PROFILE.ADMIN_PROFILE />
	},


	// SERVICE

	{
		path: dashboardPagesMenu.services.path,
		element: <SERVICE_MANAGEMENT.SERVICE_MANAGEMENT />
	},
	{
		path: dashboardPagesMenu.services.path + '/view/:id',
		element: <SERVICE_MANAGEMENT.SERVICE_MANAGEMENT_VIEW />
	},
	{
		path: `/admin-profile/:id`,
		element: <ADMIN_PROFILE.ADMIN_PROFILE />
	},


	// Offerings
	{
		path: dashboardPagesMenu.Offerings.path,
		element: <OFFERINGS.OFFERINGS />
	},
	{
		path: dashboardPagesMenu.Offerings.path + '/view/:id',
		element: <OFFERINGS.OFFERINGS />
	},

	// BOOKINGS
	{
		path: dashboardPagesMenu.bookings.path,
		element: <BOOKINGS.BOOKING />
	},
	{
		path: dashboardPagesMenu.bookings.path + '/view/:id',
		element: <BOOKINGS.BOOKING />
	},

	// PAYMENTS
	{
		path: dashboardPagesMenu.payments.path,
		element: <PAYMENTS.PAYMENT />
	},
	{
		path: dashboardPagesMenu.payments.path + '/view/:id',
		element: <PAYMENTS.PAYMENT />
	},

	// PREFERENCES
	{
		path: dashboardPagesMenu.preferences.path,
		element: <PREFERENCES.PREFERENCES />
	},
	{
		path: dashboardPagesMenu.preferences.path + '/view/:id',
		element: <PREFERENCES.PREFERENCES />
	},

	// REVIEWS
	{
		path: dashboardPagesMenu.Reviews.path,
		element: <REVIEWS.REVIEWS />
	},
	{
		path: dashboardPagesMenu.Reviews.path + '/view/:id',
		element: <REVIEWS.REVIEWS />
	},

	// INVENTORIES
	{
		path: dashboardPagesMenu.Inventories.path,
		element: <INVENTORIES.INVENTORIES />
	},
	{
		path: dashboardPagesMenu.Inventories.path + '/view/:id',
		element: <INVENTORIES.INVENTORIES />
	},


	// TRANSACTION
	{
		path: dashboardPagesMenu.Transactions.path,
		element: <TRANSACTION.TRANSACTION />
	},
	{
		path: dashboardPagesMenu.Transactions.path + '/view/:id',
		element: <TRANSACTION.TRANSACTION />
	},


	// SUBSCRIPTIONS_Plans
	{
		path: dashboardPagesMenu.subscriptions_plan.path,
		element: <SUBSCRIPTION_PLAN.SUBSCRIPTIONPLAN />
	},
	{
		path: dashboardPagesMenu.subscriptions_plan.path + '/view/:id',
		element: <SUBSCRIPTION_PLAN.SUBSCRIPTIONPLAN />
	},


	// SUBSCRIPTIONS
	{
		path: dashboardPagesMenu.subscriptionsdetails.path,
		element: <SUBSCRIPTIONS.SUBSCRIPTION />
	},
	{
		path: dashboardPagesMenu.subscriptionsdetails.path + '/view/:id',
		element: <SUBSCRIPTIONS.SUBSCRIPTION />
	},

	// Discount_Plans
	{
		path: dashboardPagesMenu.discountedplan.path,
		element: <DISCOUNTPLANS.DISCOUNTPLANS />
	},
	{
		path: dashboardPagesMenu.discountedplan.path + '/view/:id',
		element: <DISCOUNTPLANS.DISCOUNTPLANS />
	},

	// Demanding_Staff
	{
		path: dashboardPagesMenu.demandingStaff.path,
		element: <DEMANDINGSTAFF.DEMANDINGSTAFF />
	},
	{
		path: dashboardPagesMenu.demandingStaff.path + '/view/:id',
		element: <DEMANDINGSTAFF.DEMANDINGSTAFF />
	},



	// // Matchmaking_Tools
	{
		path: dashboardPagesMenu.Reports.subMenu.Customer_Loyality.path,
		element:<REPORTS.Customer_Loyality/>
	},
	// {
	// 	path: dashboardPagesMenu.Matchmaking_Tools.subMenu.compatibility_quizzes.path,
	// 	element:<MATCHMAKINGTOOLS.compatibility_quizzes/>
	// },






	// // SUBSCRIPTION
	// {
	// 	path: dashboardPagesMenu.financial_management.subMenu.subscription_plans.path,
	// 	element:<SUBSCRIPTION.SUBSCRIPTION/>
	// },
	// {
	// 	path: dashboardPagesMenu.financial_management.subMenu.payment_history_invoicing.path,
	// 	element: <APP.SALES.TRANSACTIONS />,
	// },
	// {
	// 	path: dashboardPagesMenu.financial_management.subMenu.financial_reporting.path,
	// 	element: <SUBSCRIPTION.FINANCIALREPORTING />,
	// },

	// INTEREST
	// {
	// 	path: dashboardPagesMenu.user_management.subMenu.Interest.path,
	// 	element:<INTEREST.INTEREST/>
	// },
	// REPORTED_USERS
	// {
	// 	path: dashboardPagesMenu.reported_users.path,
	// 	element:<REPORTED_USERS.REPORTED_USERS/>
	// },
	// PAYMENTS_TRANSACTIONS
	// {
	//    path:dashboardPagesMenu.paymentsTransactions.path,
	//    element:<PAYMENTS_TRANSACTIONS.PAYMENTS_TRANSACTIONS/>
	// },
	// SUBSCRIPTION_PLANS
	// {
	// 	path:dashboardPagesMenu.subscription_plans.path,
	// 	element:<SUBSCRIPTION_PLANS.SUBSCRIPTION_PLANS/>
	//  },
	//  ANALYTICS_REPORTS

	// {
	// 	path:dashboardPagesMenu.analytics_reports.path,
	// 	element:<ANALYTICS_REPORTS.ANALYTICS_REPORTS/>
	//  },
	//  CONTENT_MANAGEMENT
	// {
	// 	path:dashboardPagesMenu.content_management.path,
	// 	element:<CONTENT_MANAGEMENT.CONTENT_MANAGEMENT/>
	//  },
	//  SETTINGS_CONFIGURATION
	// {
	// 	path:dashboardPagesMenu.settings_configuration.path,
	// 	element:<SETTINGS_CONFIGURATION.SETTINGS_CONFIGURATION/>
	//  },

	//  modes
	{
		path: dashboardPagesMenu.modes.path,
		element: <MODES.MODES />
	},

	// Roles
	{
		path: dashboardPagesMenu.Roles.path,
		element: <ROLES.ROLES />
	},

	// Permissions
	{
		path: dashboardPagesMenu.Permission.path,
		element: <PERMISSIONS.PERMISSIONS />
	},
	// SERVICES
	{
		path: dashboardPagesMenu.TagCategory.path,
		element: <SERVICES.SERVICE />
	},
	// SERVICES_ROLE
	{
		path: dashboardPagesMenu.Tag.path,
		element: <SERVICESROLE.SERVICEROLE />
	},

	// Content Management

	// {
	// 	path:dashboardPagesMenu.content_management.subMenu.media_library_management.path,
	// 	element:<CONTENT_MANAGEMENT.MEDIALIBRARYMANAGEMENT/>
	// },
	{
		path:dashboardPagesMenu.content_management.subMenu.blog_articles_publishing.path,
		element:<CONTENT_MANAGEMENT.BLOG/>
	},
	{
		path:dashboardPagesMenu.content_management.subMenu.faq_management.path,
		element:<CONTENT_MANAGEMENT.FAQ/>
	},
	// {
	// 	path:dashboardPagesMenu.content_management.subMenu.community_guidelines_enforcement.path,
	// 	element:<CONTENT_MANAGEMENT.COMMUNITYQUIDELINES/>
	// },



	// {
	// 	path:dashboardPagesMenu.compliance_and_legal.path,
	// 	element:<CONTENT_MANAGEMENT.COMMUNITYQUIDELINES/>
	// },
	// // support_help_desk
	{
		path:dashboardPagesMenu.support_help_desk.path,
		element:<SUPPORT_HELP_DESK.SUPPORT_HELP_DESK/>
	},
	/**
	 * Landing
	 */
	// {
	// 	path: dashboardPagesMenu.test.path,
	// 	element:<TEST.TEST/>
	// },
	{
		path: dashboardPagesMenu.dashboard.path,
		element: <LANDING.DASHBOARD />,
	},
	{
		path: dashboardPagesMenu.dashboard.path,
		element: <LANDING.DASHBOARD_BOOKING />,
	},
	// {
	// 	path: dashboardPagesMenu.summary.path,
	// 	element: <LANDING.SUMMARY />,
	// },

	/** ************************************************** */

	/**
	 * Pages
	 */

	/**
	 * Single Pages
	 */
	{
		path: demoPagesMenu.singlePages.subMenu.boxedSingle.path,
		element: <SINGLE.BOXED />,
	},
	{
		path: demoPagesMenu.singlePages.subMenu.fluidSingle.path,
		element: <SINGLE.FLUID />,
	},

	/**
	 * List
	 */
	{
		path: demoPagesMenu.listPages.subMenu.listBoxed.path,
		element: <LIST.BOXED />,
	},
	{
		path: demoPagesMenu.listPages.subMenu.listFluid.path,
		element: <LIST.FLUID />,
	},

	/**
	 * Grid
	 */
	{
		path: demoPagesMenu.gridPages.subMenu.gridBoxed.path,
		element: <GRID.BOXED />,
	},
	{
		path: demoPagesMenu.gridPages.subMenu.gridFluid.path,
		element: <GRID.FLUID />,
	},

	/**
	 * Edit
	 */
	{
		path: demoPagesMenu.editPages.subMenu.editModern.path,
		element: <EDIT.MODERN />,
	},
	{
		path: demoPagesMenu.editPages.subMenu.editBoxed.path,
		element: <EDIT.BOXED />,
	},
	{
		path: demoPagesMenu.editPages.subMenu.editFluid.path,
		element: <EDIT.FLUID />,
	},
	{
		path: demoPagesMenu.editPages.subMenu.editWizard.path,
		element: <EDIT.WIZARD />,
	},
	{
		path: demoPagesMenu.editPages.subMenu.editInCanvas.path,
		element: <EDIT.IN_CANVAS />,
	},
	{
		path: demoPagesMenu.editPages.subMenu.editInModal.path,
		element: <EDIT.IN_MODAL />,
	},

	{
		path: demoPagesMenu.pricingTable.path,
		element: <PRICING.PRICING_TABLE />,
	},

	/**
	 * END - Pages
	 */

	/**
	 * Auth Page
	 */
	{
		path: demoPagesMenu.page404.path,
		element: <AUTH.PAGE_404 />,
	},
	{
		path: demoPagesMenu.login.path,
		element: <Login />,
	},
	{
		path: demoPagesMenu.signUp.path,
		element: <Login isSignUp />,
	},

	/**
	 * App
	 */

	/**
	 * App > Project Management
	 */
	{
		path: demoPagesMenu.projectManagement.subMenu.list.path,
		element: <APP.PROJECT_MANAGEMENT.PROJECTS_LIST />,
	},
	{
		path: `${demoPagesMenu.projectManagement.subMenu.itemID.path}/:id`,
		element: <APP.PROJECT_MANAGEMENT.PROJECT />,
	},

	/**
	 * App > Knowledge
	 */
	{
		path: demoPagesMenu.knowledge.subMenu.grid.path,
		element: <APP.KNOWLEDGE.GRID />,
	},
	{
		path: `${demoPagesMenu.knowledge.subMenu.itemID.path}/:id`,
		element: <APP.KNOWLEDGE.VIEW />,
	},

	/**
	 * App > Sales
	 */
	{
		path: demoPagesMenu.sales.subMenu.transactions.path,
		element: <APP.SALES.TRANSACTIONS />,
	},
	{
		path: demoPagesMenu.sales.subMenu.salesList.path,
		element: <APP.SALES.PRODUCTS />,
	},
	{
		path: demoPagesMenu.sales.subMenu.productsGrid.path,
		element: <APP.SALES.PRODUCTS_GRID />,
	},
	{
		path: `${demoPagesMenu.sales.subMenu.productID.path}/:id`,
		element: <APP.SALES.PRODUCTS_VIEW />,
	},

	/**
	 * App > Appointment
	 */
	{
		path: demoPagesMenu.appointment.subMenu.calendar.path,
		element: <APP.APPOINTMENT.CALENDAR />,
	},
	{
		path: demoPagesMenu.appointment.subMenu.employeeList.path,
		element: <APP.APPOINTMENT.EMPLOYEE_LIST />,
	},
	{
		path: `${demoPagesMenu.appointment.subMenu.employeeID.path}/:id`,
		element: <APP.APPOINTMENT.EMPLOYEE_VIEW />,
	},
	{
		path: demoPagesMenu.appointment.subMenu.appointmentList.path,
		element: <APP.APPOINTMENT.APPOINTMENT_LIST />,
	},

	/**
	 * App > CRM
	 */
	{
		path: demoPagesMenu.crm.subMenu.dashboard.path,
		element: <APP.CRM.CRM_DASHBOARD />,
	},
	{
		path: demoPagesMenu.crm.subMenu.customersList.path,
		element: <APP.CRM.CUSTOMERS />,
	},
	{
		path: `${demoPagesMenu.crm.subMenu.customerID.path}/:id`,
		element: <APP.CRM.CUSTOMER />,
	},

	/**
	 * App > Chat
	 */
	{
		path: demoPagesMenu.chat.subMenu.withListChat.path,
		element: <APP.CHAT.WITH_LIST />,
	},
	{
		path: demoPagesMenu.chat.subMenu.onlyListChat.path,
		element: <APP.CHAT.ONLY_LIST />,
	},

	/**
	 * END - App
	 */

	/** ************************************************** */

	/**
	 * Page Layout Types
	 */
	{
		path: pageLayoutTypesPagesMenu.blank.path,
		element: <PAGE_LAYOUTS.BLANK />,
	},
	{
		path: pageLayoutTypesPagesMenu.pageLayout.subMenu.headerAndSubheader.path,
		element: <PAGE_LAYOUTS.HEADER_SUBHEADER />,
	},
	{
		path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyHeader.path,
		element: <PAGE_LAYOUTS.HEADER />,
	},
	{
		path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlySubheader.path,
		element: <PAGE_LAYOUTS.SUBHEADER />,
	},
	{
		path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyContent.path,
		element: <PAGE_LAYOUTS.CONTENT />,
	},
	{
		path: pageLayoutTypesPagesMenu.asideTypes.subMenu.defaultAside.path,
		element: <PAGE_LAYOUTS.ASIDE />,
	},
	{
		path: pageLayoutTypesPagesMenu.asideTypes.subMenu.minimizeAside.path,
		element: <PAGE_LAYOUTS.MINIMIZE_ASIDE />,
	},
];
const documentation: RouteProps[] = [
	/**
	 * Getting Started
	 */
	{
		path: gettingStartedPagesMenu.gettingStarted.subMenu.installation.path,
		element: <GETTING_STARTED.INSTALLATION />,
	},
	{
		path: gettingStartedPagesMenu.gettingStarted.subMenu.dev.path,
		element: <GETTING_STARTED.DEVELOPMENT />,
	},
	{
		path: gettingStartedPagesMenu.gettingStarted.subMenu.folderStructure.path,
		element: <GETTING_STARTED.FOLDER />,
	},
	{
		path: gettingStartedPagesMenu.gettingStarted.subMenu.bootstrapVariables.path,
		element: <GETTING_STARTED.BOOTSTRAP />,
	},
	{
		path: gettingStartedPagesMenu.gettingStarted.subMenu.projectStructure.path,
		element: <GETTING_STARTED.PROJECT />,
	},
	/**
	 * Routes
	 */
	{
		path: gettingStartedPagesMenu.routes.subMenu.router.path,
		element: <ROUTES.ROUTER />,
	},
	/**
	 * Bootstrap
	 */

	/**
	 * Content
	 */
	{
		path: componentPagesMenu.content.path,
		element: <CONTENT.CONTENTS />,
	},
	{
		path: componentPagesMenu.content.subMenu.typography.path,
		element: <CONTENT.TYPOGRAPHY />,
	},
	{
		path: componentPagesMenu.content.subMenu.images.path,
		element: <CONTENT.IMAGES />,
	},
	{
		path: componentPagesMenu.content.subMenu.tables.path,
		element: <CONTENT.TABLES />,
	},
	{
		path: componentPagesMenu.content.subMenu.figures.path,
		element: <CONTENT.FIGURES />,
	},

	/**
	 * Forms
	 */
	{
		path: componentPagesMenu.forms.path,
		element: <FORMS_PAGE.FORMS />,
	},
	{
		path: componentPagesMenu.forms.subMenu.formGroup.path,
		element: <FORMS_PAGE.FORM_GROUP />,
	},
	{
		path: componentPagesMenu.forms.subMenu.formControl.path,
		element: <FORMS_PAGE.FORM_CONTROLS />,
	},
	{
		path: componentPagesMenu.forms.subMenu.select.path,
		element: <FORMS_PAGE.SELECT />,
	},
	{
		path: componentPagesMenu.forms.subMenu.checksAndRadio.path,
		element: <FORMS_PAGE.CHECKS_AND_RADIO />,
	},
	{
		path: componentPagesMenu.forms.subMenu.range.path,
		element: <FORMS_PAGE.RANGE />,
	},
	{
		path: componentPagesMenu.forms.subMenu.inputGroup.path,
		element: <FORMS_PAGE.INPUT_GROUP />,
	},
	{
		path: componentPagesMenu.forms.subMenu.validation.path,
		element: <FORMS_PAGE.VALIDATION />,
	},
	{
		path: componentPagesMenu.forms.subMenu.wizard.path,
		element: <FORMS_PAGE.WIZARD />,
	},

	/**
	 * Components
	 */
	{
		path: componentPagesMenu.components.path,
		element: <COMPONENTS_PAGE.COMPONENTS />,
	},
	{
		path: componentPagesMenu.components.subMenu.tooltip.path,
		element: <COMPONENTS_PAGE.TOOLTIP />,
	},
	{
		path: componentPagesMenu.components.subMenu.toasts.path,
		element: <COMPONENTS_PAGE.TOASTS />,
	},
	{
		path: componentPagesMenu.components.subMenu.scrollspy.path,
		element: <COMPONENTS_PAGE.SCROLLSPY />,
	},
	{
		path: componentPagesMenu.components.subMenu.carousel.path,
		element: <COMPONENTS_PAGE.CAROUSEL />,
	},
	{
		path: componentPagesMenu.components.subMenu.spinners.path,
		element: <COMPONENTS_PAGE.SPINNER />,
	},
	{
		path: componentPagesMenu.components.subMenu.listGroup.path,
		element: <COMPONENTS_PAGE.LIST_GROUP />,
	},
	{
		path: componentPagesMenu.components.subMenu.breadcrumb.path,
		element: <COMPONENTS_PAGE.BREADCRUMB />,
	},
	{
		path: componentPagesMenu.components.subMenu.collapse.path,
		element: <COMPONENTS_PAGE.COLLAPSE />,
	},
	{
		path: componentPagesMenu.components.subMenu.pagination.path,
		element: <COMPONENTS_PAGE.PAGINATION />,
	},
	{
		path: componentPagesMenu.components.subMenu.progress.path,
		element: <COMPONENTS_PAGE.PROGRESS />,
	},
	{
		path: componentPagesMenu.components.subMenu.card.path,
		element: <COMPONENTS_PAGE.CARD />,
	},
	{
		path: componentPagesMenu.components.subMenu.button.path,
		element: <COMPONENTS_PAGE.BUTTON />,
	},
	{
		path: componentPagesMenu.components.subMenu.buttonGroup.path,
		element: <COMPONENTS_PAGE.BUTTON_GROUP />,
	},
	{
		path: componentPagesMenu.components.subMenu.alert.path,
		element: <COMPONENTS_PAGE.ALERT />,
	},
	{
		path: componentPagesMenu.components.subMenu.badge.path,
		element: <COMPONENTS_PAGE.BADGE />,
	},
	{
		path: componentPagesMenu.components.subMenu.popovers.path,
		element: <COMPONENTS_PAGE.POPOVERS />,
	},
	{
		path: componentPagesMenu.components.subMenu.dropdowns.path,
		element: <COMPONENTS_PAGE.DROPDOWN />,
	},
	{
		path: componentPagesMenu.components.subMenu.accordion.path,
		element: <COMPONENTS_PAGE.ACCORDION />,
	},
	{
		path: componentPagesMenu.components.subMenu.modal.path,
		element: <COMPONENTS_PAGE.MODAL />,
	},
	{
		path: componentPagesMenu.components.subMenu.navsTabs.path,
		element: <COMPONENTS_PAGE.NAVS_TABS />,
	},
	{
		path: componentPagesMenu.components.subMenu.offcanvas.path,
		element: <COMPONENTS_PAGE.OFF_CANVAS />,
	},
	{
		path: componentPagesMenu.components.subMenu.table.path,
		element: <COMPONENTS_PAGE.TABLE />,
	},

	/**
	 * Utilities
	 */
	{
		path: componentPagesMenu.utilities.path,
		element: <UTILITIES.UTILITIES />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.api.path,
		element: <UTILITIES.API />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.background.path,
		element: <UTILITIES.BACKGROUND />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.borders.path,
		element: <UTILITIES.BORDERS />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.colors.path,
		element: <UTILITIES.COLORS />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.display.path,
		element: <UTILITIES.DISPLAY />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.flex.path,
		element: <UTILITIES.FLEX />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.float.path,
		element: <UTILITIES.FLOAT />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.interactions.path,
		element: <UTILITIES.INTERACTIONS />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.overflow.path,
		element: <UTILITIES.OVERFLOW />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.position.path,
		element: <UTILITIES.POSITION />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.shadows.path,
		element: <UTILITIES.SHADOWS />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.sizing.path,
		element: <UTILITIES.SIZING />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.spacing.path,
		element: <UTILITIES.SPACING />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.text.path,
		element: <UTILITIES.TEXT />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.verticalAlign.path,
		element: <UTILITIES.VERTICAL_ALIGN />,
	},
	{
		path: componentPagesMenu.utilities.subMenu.visibility.path,
		element: <UTILITIES.VISIBILITY />,
	},

	/**
	 * Extra
	 */

	/**
	 * Icons
	 */
	{
		path: componentPagesMenu.icons.path,
		element: <ICONS.ICONS_LIST />,
	},
	{
		path: componentPagesMenu.icons.subMenu.icon.path,
		element: <ICONS.ICON />,
	},
	{
		path: componentPagesMenu.icons.subMenu.material.path,
		element: <ICONS.MATERIAL />,
	},

	/**
	 * Charts
	 */
	{
		path: componentPagesMenu.charts.path,
		element: <CHARTS_PAGE.CHART_LIST />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsUsage.path,
		element: <CHARTS_PAGE.GENERAL_USAGE />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsSparkline.path,
		element: <CHARTS_PAGE.SPARKLINE />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsLine.path,
		element: <CHARTS_PAGE.LINE />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsArea.path,
		element: <CHARTS_PAGE.AREA />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsColumn.path,
		element: <CHARTS_PAGE.COLUMN />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsBar.path,
		element: <CHARTS_PAGE.BAR />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsMixed.path,
		element: <CHARTS_PAGE.MIXED />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsTimeline.path,
		element: <CHARTS_PAGE.TIMELINE />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsCandleStick.path,
		element: <CHARTS_PAGE.CANDLESTICK />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsBoxWhisker.path,
		element: <CHARTS_PAGE.BOX_WHISKER />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsPieDonut.path,
		element: <CHARTS_PAGE.PIE_DONUT />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsRadar.path,
		element: <CHARTS_PAGE.RADAR />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsPolar.path,
		element: <CHARTS_PAGE.POLAR />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsRadialBar.path,
		element: <CHARTS_PAGE.RADIAL_BAR />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsBubble.path,
		element: <CHARTS_PAGE.BUBBLE />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsScatter.path,
		element: <CHARTS_PAGE.SCATTER />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsHeatMap.path,
		element: <CHARTS_PAGE.HEAT_MAP />,
	},
	{
		path: componentPagesMenu.charts.subMenu.chartsTreeMap.path,
		element: <CHARTS_PAGE.TREE_MAP />,
	},

	{
		path: componentPagesMenu.notification.path,
		element: <EXTRA.NOTIFICATION />,
	},
	{
		path: componentPagesMenu.hooks.path,
		element: <EXTRA.HOOKS />,
	},
];
const contents = [...presentation, ...documentation];

export default contents;
