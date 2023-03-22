// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/admin',
    icon: icon('ic_dashboard'),
  },
  {
    title: 'Student Information',
    path: '/dashboard/studentinfo',
    icon: icon('ic_student'),
  },
  {
    title: 'Add Student Details',
    path: '/dashboard/addinfo',
    icon: icon('ic_add'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
