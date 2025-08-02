 export interface Role {
    mode: string;
    name: string;
    display_name: string;
    description: string;
    is_activated: boolean;
    note: string;
    admin_note: string;
    _id:string
}

export interface RoleState {
    role:{};
    roles: Role[];
    loading: boolean;
    error: string | null;
  }
  


  export interface Service{
    name: string;
    display_name: string;
    description: string;
    is_activated: boolean;
    note: string;
    admin_note: string;
    _id:string
  }
  export interface ServiceState{
    service:{};
    Services: Service[];
    loading: boolean;
    error: string | null;
  }
 
  export interface Plan{
    name: string;
    display_name: string;
    description: string;
    is_activated: boolean;
    note: string;
    admin_note: string;
    _id:string
  }
  export interface PlanState{
    plan:{};
    plans: Plan[];
    loading: boolean;
    error: string | null;
  }
 