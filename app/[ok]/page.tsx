'use client'
interface User {

  params: {
    ok: string;
  };
};

export default function User11({ params: { ok: userId } }: User) {
  console.log("userId:", userId);
  console.log(userId) 
  return (
    <>
      <p>{userId}</p>
    </>
  );
}

