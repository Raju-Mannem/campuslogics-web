import Link from "next/link";

export default function About() {
    return (
        <section className="min-h-screen px-4 sm:px-6 lg:px-8">
                <article className="bg-white w-full min-h-screen flex flex-col gap-4 border-x border-gray-200 p-12">
                        <h1 className="text-3xl font-bold text-gray-900">About us</h1>
                        <p className="text-gray-600 text-lg">
                           CampusLogics is an Educational platform for students, freshers, professionals, jobseekers and etc... 
                            In these days many aspirants are suffering to find to a right One. We know time is more valauble. In CampusLogics we provide detailed information latest job openings, internships, scholarships, admissions, resumes & materials in time. Our main focus is to provide information about latest notifications.
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900">Main Motive</h2>
                        <p>We believe in free education and resources, The Education is not for the one who is having Money But also who works hard.
                            We always keep support hardwork. Feel free to use our platform and keep update yourself. Please don&apos;t missuse any kind of resources. All the best.
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900">Note :</h2>
                        <p>
                            All the jobs posted in CampusLogics provides only information.Companies may change/modify/postpone/cancel any exam or event without inform . CampusLogics is not responsible if any exam or event change / modify / postpone / cancel.
                            CampusLogics does not charge any amount.
                        </p><br/>
                        <p className="text-gray-600 text-lg"> If you have any queries please contact us <Link href="mailto:campuslogics.in@gmail.com" className="text-brand-600 font-bold">campuslogics.in@gmail.com</Link></p>
                </article>
    </section>
    );
}
