import { redirect } from "next/navigation";

export default function CareerWorldRouter({ params }: { params: { career: string } }) {
  redirect(`/curriculum/${params.career}/simulator`);
}
