import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Header2 from '../../components/ResidentComponents/Settings/Header2';
import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
import CurrentDevice from '../../components/ResidentComponents/Settings/CurrentDevice';
import OtherDevice from '../../components/ResidentComponents/Settings/OtherDevice';
import NoteP from '../../components/ResidentComponents/SafetyCards/NoteP';

// Scripts
import { getLoggedDevices } from '../../services/getLoggedDevices';
import logoutDevice from '../../services/logoutDevice';
import filterCurrent from '../../scripts/filterCurrent';
import { getRelativeTime } from '../../utils/fomatters';

export default function LoggedDevices() {
  const [loggedDevices, setLoggedDevices] = useState([]);
  const [current, setCurrent] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const response = await getLoggedDevices();
    setLoggedDevices(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search filter 
  useEffect(() => {
    const filtered = loggedDevices.filter(device => {
      const search = searchTerm.toLowerCase();
      return (
        device.os?.toLowerCase().includes(search) ||
        device.browser?.toLowerCase().includes(search) ||
        device.device_id?.toLowerCase().includes(search)
      );
    });

    setCurrent(filterCurrent(filtered, true));
    setPrevious(filterCurrent(filtered, false));
  }, [searchTerm, loggedDevices]);

  return (
    <ResidentLayout>
      <div className="flex flex-wrap flex-col justify-start mb-[12px] space-y-4">
        {loading ? (
          <NoteP text="Loading.." />
        ) : (
          <>
            <Header2
              icon="/mshale.svg"
              text="Logged In Devices"
              callback={() => navigate('/resident/settings')}
            />
            <input
              type="text"
              className="flex flex-row w-full h-[40px] rounded-[8px] border-[1px] border-[#E6FBE9] gap-[10px] py-[3px] px-[16px] bg-[#FFFFFF]"
              style={{ marginTop: '16px' }}
              placeholder="Search devices"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {current.length > 0 && current.map((device) => (
              <CurrentDevice
                key={device.device_id}
                os={device.os}
                place="Nairobi, Kenya"
                time={getRelativeTime(device.last_activity)}
                browser={device.browser}
              />
            ))}
            {previous.length > 0 && previous.map((device) => (
              <OtherDevice
                key={device.device_id}
                os={device.os}
                place="Nairobi, Kenya"
                time={getRelativeTime(device.last_activity)}
                browser={device.browser}
                callback={() => logoutDevice(device.device_id)}
              />
            ))}
          </>
        )}
      </div>
    </ResidentLayout>
  );
}
