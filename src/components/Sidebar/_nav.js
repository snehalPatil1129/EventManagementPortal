export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Events',
      url: '/events',
      icon: 'icon-calendar'
    },
    {
      name: 'Sessions',
      url: '/sessions',
      icon: 'icon-calendar'
    },
    {
      name: 'Rooms List',
      url: '/roomsList',
      icon: 'icon-home'
    },
    {
      name: 'Attendance',
      url: '/attendance',
      icon: 'icon-user'
    },
    {
      name: 'Attendee List',
      url: '/registrationList',
      icon: 'icon-user'
    },
     {
      name: 'speakers',
      url: '/speakers',
      icon: 'icon-user'
    },
    {
      name: 'Dynamic Forms',
      url: '/dynamicForms',
      icon: 'icon-question'
    },
    {
      name: 'User Profiles',
      url: '/profiles',
      icon: 'icon-user'
    },
    {
      name: 'Static Pages',
      url: '/staticPages/',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'About Us',
          url: '/staticPages/aboutUs',
          icon: 'icon-puzzle'
        },
        {
          name: 'About Eternus',
          url: '/staticPages/aboutEternus',
          icon: 'icon-note'
        },
        {
          name: 'Help Desk',
          url: '/staticPages/helpDesk',
          icon: 'icon-note'
        },
        {
          name: 'Event Location',
          url: '/staticPages/eventLocation',
          icon: 'icon-note'
        },
      ]
    },
    {
      name: 'Sponsors',
      url: '/sponsors',
      icon: 'icon-user'
    },
    {
      name: 'Logout',
      url: '/logout',
      icon: 'icon-question'
    }
  ]
};
