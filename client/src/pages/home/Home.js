        import "./Home.css";
        import "bootstrap/dist/css/bootstrap.min.css"
        import Stat from './stat'
        import Topbar from "../../components/topbar/Topbar";
        import Sidebar from "../../components/sidebar/Sidebar";
        // import Footer from "../../components/footer/Footer";
      

        export default function Home() {
        return (
            <>
            <div className="color-backgroung">
            <Topbar />
            <Stat />
            <Sidebar />
            {/* <Footer /> */}
            </div>
            </>
        )
        }
