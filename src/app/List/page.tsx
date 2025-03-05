// import React from "react";
// import Link from "next/link";

// // Define the prop type for List
// interface ListProps {
//   listProps: string[];
// }

// // Use List as the default export
// const List: React.FC<ListProps> = ({ listProps }) => {
//   return (
//     <ul className="bg-gray-400 z-2 absolute text-center w-35 list-container">
//       {listProps.map((item) => (
//         <li className="hover:bg-purple-400 list" key={item}>
//           <Link href={item}>{item}</Link>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default List;
import React from 'react'

function page() {
  return (
    <div>
      <h1>Page</h1>
    </div>
  )
}

export default page

