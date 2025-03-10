
import "../globals.css";

const TitleOfPage = ({ title }: { title: string }) => {
  return (
    <div className="flex w-full gap-10 flex-row justify-between">
      <div className="flex flex-grow items-center">
        <h1 className="p-5 text-3xl font-bold">{title}</h1>
      </div>
    </div>
  )
}

export default function Page() {
  const title: string = 'Admin Page';

  return (
    <div>
      <div>
        <TitleOfPage title={title} />
        <div className='flex flex-col w-full gap-10'>
        </div>
      </div>
    </div>
  );
}
