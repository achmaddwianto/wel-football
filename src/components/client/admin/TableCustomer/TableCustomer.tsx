import { getUsers } from "@/lib/data";

const TableCustomer = async () => {
  const users = await getUsers();
  if (!users?.length) return <h1 className="tex-2xl">Not Found</h1>;
  return (
    <table className="w-full bg-white mt-3">
      <thead className="text-semibold border-b border-gray-500 bg-gray-200">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Nama</th>
          <th className="py-3 px-6 text-left text-sm">Email</th>
          <th className="py-3 px-6 text-left text-sm">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={users.id}>
            <td className="py-3 px-6">{user.name}</td>
            <td className="py-3 px-6">{user.email}</td>
            <td className="py-3 px-6">{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCustomer;
