import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdDashboard,
  MdPeople,
  MdBusiness,
  MdEvent,
  MdSettings,
  MdAnalytics,
  MdPayments,
  MdSecurity,
} from 'react-icons/md';

// System Admin Imports
import SystemDashboard from 'views/systemAdmin/dashboard';
import UsersManagement from 'views/systemAdmin/users';
import OrganizersManagement from 'views/systemAdmin/organizers';
import AllEvents from 'views/systemAdmin/events';
import SystemSettings from 'views/systemAdmin/settings';
import Analytics from 'views/systemAdmin/analytics';
import Payments from 'views/systemAdmin/payments';

const systemAdminRoutes = [
  {
    name: 'Dashboard',
    layout: '/system-admin',
    path: '/dashboard',
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
    component: <SystemDashboard />,
  },
  {
    name: 'Users',
    layout: '/system-admin',
    path: '/users',
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
    component: <UsersManagement />,
  },
  {
    name: 'Organizers',
    layout: '/system-admin',
    path: '/organizers',
    icon: <Icon as={MdBusiness} width="20px" height="20px" color="inherit" />,
    component: <OrganizersManagement />,
  },
  {
    name: 'All Events',
    layout: '/system-admin',
    path: '/events',
    icon: <Icon as={MdEvent} width="20px" height="20px" color="inherit" />,
    component: <AllEvents />,
  },
  {
    name: 'Analytics',
    layout: '/system-admin',
    path: '/analytics',
    icon: <Icon as={MdAnalytics} width="20px" height="20px" color="inherit" />,
    component: <Analytics />,
  },
  {
    name: 'Payments',
    layout: '/system-admin',
    path: '/payments',
    icon: <Icon as={MdPayments} width="20px" height="20px" color="inherit" />,
    component: <Payments />,
  },
  {
    name: 'Settings',
    layout: '/system-admin',
    path: '/settings',
    icon: <Icon as={MdSettings} width="20px" height="20px" color="inherit" />,
    component: <SystemSettings />,
  },
];

export default systemAdminRoutes;

