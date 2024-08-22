import Image from "next/image";
interface User{
  params:{
    userId:string;
  };
};

export default function Home({params:{userId}}:User) {
  return (
   <>
   <p>{userId}</p>

   </>
  );
}
