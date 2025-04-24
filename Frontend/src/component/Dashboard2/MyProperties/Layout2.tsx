import { RefObject } from "react";


function Layout({ title, children, ref }: { title: string, children: React.ReactNode, ref: RefObject<HTMLDivElement | null> }) {
  return (
    <div className="col-lg-9 col-md-8 col-12 mg-top-30" ref={ref}>
      <div className="homec-dashboard__inner homec-border">
        <h3 className="homec-dashboard__heading m-0">{title}</h3>
        <div className="row">{children}</div>
      </div>
    </div>
  );
}



export default Layout;
