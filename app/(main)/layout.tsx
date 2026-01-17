import type { PropsWithChildren } from '@/lib/types/types';

const MainLayout = ({ children }: PropsWithChildren) => {
  return <div className="h-screen overflow-y-auto pt-20">{children}</div>;
};

MainLayout.displayName = 'MainLayout';

export default MainLayout;
