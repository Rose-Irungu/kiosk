import React, { useState, useEffect } from "react";
import { X, Plus, Home, Users, Trash2 } from "lucide-react";

const FloorRoomManager = () => {
  const [floors, setFloors] = useState([]);
  const [showFloorModal, setShowFloorModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedFloorId, setSelectedFloorId] = useState(null);
  const [floorName, setFloorName] = useState("");
  const [roomName, setRoomName] = useState("");


  useEffect(() => {
    const savedFacilityData = localStorage.getItem("facilityData");
    if (savedFacilityData) {
      try {
        const parsedData = JSON.parse(savedFacilityData);
        if (parsedData.floors && Array.isArray(parsedData.floors)) {
          setFloors(parsedData.floors);
        }
      } catch (error) {
        console.error("Error parsing facility data:", error);
        setFloors([]);
      }
    }
  }, []);

  // Save floors data to localStorage whenever floors change
  const saveFloorsData = (updatedFloors) => {
    const existingFacilityData = localStorage.getItem("facilityData");
    let facilityData = {};
    
    if (existingFacilityData) {
      try {
        facilityData = JSON.parse(existingFacilityData);
      } catch (error) {
        console.error("Error parsing existing facility data:", error);
      }
    }

    // Update the floors data within the facility data
    facilityData.floors = updatedFloors;
    facilityData.lastUpdated = new Date().toISOString();

    localStorage.setItem("facilityData", JSON.stringify(facilityData));
  };

  const addFloor = () => {
    if (floorName.trim()) {
      const newFloor = {
        id: Date.now(),
        name: floorName.trim(),
        rooms: [],
      };
      const updatedFloors = [...floors, newFloor];
      setFloors(updatedFloors);
      saveFloorsData(updatedFloors);
      setFloorName("");
      setShowFloorModal(false);
    }
  };

  const handleSave = () => {
    saveFloorsData(floors);
    alert("Floors and rooms saved successfully!");
  };

  const addRoom = () => {
    if (roomName.trim() && selectedFloorId) {
      const newRoom = {
        id: Date.now(),
        name: roomName.trim(),
      };
      const updatedFloors = floors.map((floor) =>
        floor.id === selectedFloorId
          ? { ...floor, rooms: [...floor.rooms, newRoom] }
          : floor
      );
      setFloors(updatedFloors);
      saveFloorsData(updatedFloors);
      setRoomName("");
      setShowRoomModal(false);
      setSelectedFloorId(null);
    }
  };

  const deleteFloor = (floorId) => {
    const confirmDelete = window.confirm("Delete this floor and all its rooms?");
    if (confirmDelete) {
      const updatedFloors = floors.filter((floor) => floor.id !== floorId);
      setFloors(updatedFloors);
      saveFloorsData(updatedFloors);
    }
  };

  const deleteRoom = (floorId, roomId) => {
    const updatedFloors = floors.map((floor) =>
      floor.id === floorId
        ? {
            ...floor,
            rooms: floor.rooms.filter((room) => room.id !== roomId),
          }
        : floor
    );
    setFloors(updatedFloors);
    saveFloorsData(updatedFloors);
  };

  const openRoomModal = (floorId) => {
    setSelectedFloorId(floorId);
    setShowRoomModal(true);
  };

  const closeModals = () => {
    setShowFloorModal(false);
    setShowRoomModal(false);
    setFloorName("");
    setRoomName("");
    setSelectedFloorId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 rounded-md p-6 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold font-sans text-[#495057]">
            Building Management
          </h1>
          <button
            onClick={() => setShowFloorModal(true)}
            className="bg-[#005e0e] hover:bg-[#023609] ml-[50px] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-md"
          >
            <Plus size={20} />
            Add Floor
          </button>
        </div>

        {floors.length === 0 ? (
          <div className="text-center py-16">
            <Home size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No floors added yet. Click "Add Floor" to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {floors.map((floor) => (
              <div
                key={floor.id}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Home size={20} className="text-[#495057]" />
                    {floor.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openRoomModal(floor.id)}
                      className="bg-[#005e0e] hover:bg-[#023609] text-white px-3 py-2 rounded-md flex items-center gap-1 transition-colors duration-200 text-sm"
                    >
                      <Plus size={16} />
                      Add Room
                    </button>
                    <button
                      onClick={() => deleteFloor(floor.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete Floor"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <Users size={16} />
                    <span className="text-sm font-medium">
                      Rooms ({floor.rooms.length})
                    </span>
                  </div>

                  {floor.rooms.length === 0 ? (
                    <p className="text-gray-400 text-sm italic">
                      No rooms added yet
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {floor.rooms.map((room) => (
                        <div
                          key={room.id}
                          className="bg-gray-50 px-3 py-2 rounded-lg flex justify-between items-center"
                        >
                          <span className="text-gray-700 text-sm">
                            {room.name}
                          </span>
                          <button
                            onClick={() => deleteRoom(floor.id, room.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Delete Room"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showFloorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Add New Floor
                </h3>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Floor Name
                  </label>
                  <input
                    type="text"
                    value={floorName}
                    onChange={(e) => setFloorName(e.target.value)}
                    placeholder="Enter floor name (e.g., Ground Floor, First Floor)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005e0e] focus:border-transparent outline-none transition-all"
                    onKeyPress={(e) => e.key === "Enter" && addFloor()}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={closeModals}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addFloor}
                    disabled={!floorName.trim()}
                    className="flex-1 px-4 py-3 bg-[#005e0e] text-white rounded-lg hover:bg-[#023609] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Floor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showRoomModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Add New Room
                </h3>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Name
                  </label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Enter room name (e.g., Conference Room, Office 101)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005e0e] focus:border-transparent outline-none transition-all"
                    onKeyPress={(e) => e.key === "Enter" && addRoom()}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={closeModals}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addRoom}
                    disabled={!roomName.trim()}
                    className="flex-1 px-4 py-3 bg-[#005e0e] text-white rounded-lg hover:bg-[#023609] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <button
        onClick={handleSave}
        className="bg-[#005e0e] hover:bg-[#023609] text-white text-sm font-medium px-6 py-3 mt-[40px] rounded-md w-full"
      >
        SAVE FLOORS & ROOMS
      </button>
    </div>
  );
};

export default FloorRoomManager;