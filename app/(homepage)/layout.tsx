import Header from "@/components/header";
import Providers from "@/providers";

const HomePageLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        <div>
            <div className="h-[80px] fixed inset-y-0 w-full z-50">
                <Header />
            </div>
            <main className="h-full pt-[80px] bg-[#F7FAFC] dark:bg-[#0F172A] transition-colors">
                {children}
            </main>
        </div>
        
     );
}
 
export default HomePageLayout;