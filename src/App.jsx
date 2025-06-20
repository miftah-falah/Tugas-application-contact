import React, { useState, useEffect } from "react";
import { Trash2, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Komponen Tambah Kontak
const AddContactForm = ({ addContact }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      setError("Nama dan nomor telepon harus diisi!");
      return;
    }
    setError("");
    addContact({ id: Date.now(), name, phone });
    setName("");
    setPhone("");
  };

  useEffect(() => {
    if (name || phone) {
      setError("");
    }
  }, [name, phone]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 backdrop-blur-md bg-black/30 border border-gray-700 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <UserPlus className="text-red-400" /> Tambah Kontak
      </h2>
      {error && (
        <div className="mb-4 bg-red-600 text-white px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama"
          className="w-full px-4 py-2 bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nomor Telepon"
          className="w-full px-4 py-2 bg-black/40 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-2 rounded-md hover:shadow-lg hover:shadow-red-500/40 transition"
      >
        Tambahkan
      </button>
    </form>
  );
};

// Komponen Daftar Kontak
const ContactList = ({ contacts, deleteContact }) => {
  return (
    <div className="backdrop-blur-md bg-black/30 p-6 border border-gray-700 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-semibold mb-4">Daftar Kontak</h2>
      {contacts.length === 0 ? (
        <p className="text-gray-400">Belum ada kontak.</p>
      ) : (
        <ul>
          <AnimatePresence>
            {contacts.map((contact) => (
              <motion.li
                key={contact.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center px-4 py-3 mb-3 bg-black/40 rounded-lg hover:bg-black/50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-black text-white flex items-center justify-center font-bold uppercase shadow-inner">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-400">{contact.phone}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="text-red-400 hover:text-red-500 transition"
                  title="Hapus Kontak"
                >
                  <Trash2 size={20} />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

// Komponen Utama
function App() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Yudi Petot", phone: "081234567890" },
    { id: 2, name: "Iwung of Drakness", phone: "087654321098" },
  ]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-gray-900 text-white font-sans">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white">📱 Kontak App</h1>
          <p className="text-gray-400">Kelola nama dan nomor teleponmu</p>
        </header>

        <AddContactForm addContact={addContact} />
        <ContactList contacts={contacts} deleteContact={deleteContact} />
      </div>
    </div>
  );
}

export default App;
