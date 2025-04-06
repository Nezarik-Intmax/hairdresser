import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import Schedule from '../../components/Schedule/Schedule';
import api from '../../services/api';
import './MasterView.css';

const MasterView = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMasterSchedule = async () => {
      try {
        const response = await api.get('appointments/my-schedule/');
        setSchedule(response.data);
      } catch (error) {
        console.error('Ошибка загрузки расписания:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMasterSchedule();
  }, []);

  const handleSlotClick = async (appointment) => {
    if (appointment && window.confirm('Завершить эту запись?')) {
      try {
        await api.patch(`appointments/${appointment.id}/`, { status: 'completed' });
        setSchedule(schedule.map(item => 
          item.id === appointment.id ? { ...item, status: 'completed' } : item
        ));
      } catch (error) {
        console.error('Ошибка обновления записи:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Мое расписание
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        {loading ? (
          <Typography>Загрузка...</Typography>
        ) : (
          <Schedule 
            schedule={schedule} 
            onSlotClick={handleSlotClick} 
            isMasterView={true} 
          />
        )}
      </Paper>
    </Box>
  );
};

export default MasterView;