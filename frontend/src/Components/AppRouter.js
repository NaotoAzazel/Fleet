import { Route, Routes } from "react-router-dom";
import { routes, publicRoutes, privateRoutes } from "../Router/Router.js"
import PageNotFound from "./Pages/PageNotFound.jsx";
import { Helmet } from "react-helmet";

function AppRouter() {
  return (
    <Routes>
      {routes.map(route => 
        <Route 
          element={
            <>
              <Helmet>
                <title>{route.pageTitle}</title>
              </Helmet>
              <route.element />
            </>
          } 
          path={route.path}
          exact={route.exact}
          key={route.key}
        />
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )

  // return (
  //   Object.keys(user).length
  //     ? <Routes>
  //         {privateRoutes.map(route => 
  //           <Route 
  //             element={
  //               <>
  //                 <Helmet>
  //                   <title>{route.pageTitle}</title>
  //                 </Helmet>
  //                 <route.element />
  //               </>
  //             }
  //             path={route.path}
  //             exact={route.exact}
  //             key={route.path}
  //           />  
  //         )}
  //         <Route path="*" element={<PageNotFound />} />
  //       </Routes>

  //     : <Routes>
  //         {publicRoutes.map(route => 
  //           <Route 
  //             element={
  //             <>
  //               <Helmet>
  //                 <title>{route.pageTitle}</title>
  //               </Helmet>
  //               <route.element />
  //             </>
  //             }
  //             path={route.path}
  //             exact={route.exact}
  //             key={route.path}
  //           />  
  //         )}
  //         <Route path="*" element={<PageNotFound />} />
  //       </Routes>
  // )
}

export default AppRouter