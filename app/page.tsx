import { redirect } from 'next/navigation';

const RootPage = () => {
  redirect('/products');
};

RootPage.displayName = 'RootPage';

export default RootPage;
