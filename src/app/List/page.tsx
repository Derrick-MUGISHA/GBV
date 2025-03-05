import React from "react";
import Link from "next/link";

interface ListProps {
  listProps: string[];
}

function List({listProps}: ListProps) {
  return (
    <ul className='bg-gray-400 z-2 absolute text-center w-35 list-container'>
      {listProps.map((item) => (
        <li className="hover:bg-purple-400 list" key={item}>
          <Link href={item}>{item}</Link>
        </li>
      ))}
    </ul>
  );
}

export default List;
