

function Layout({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="col-lg-9 col-md-8 col-12 mg-top-30">
      <div className="homec-dashboard__inner homec-border">
        <h3 className="homec-dashboard__heading m-0">{title}</h3>
        <div className="row">{children}</div>
      </div>
    </div>
  );
}



export default Layout;
