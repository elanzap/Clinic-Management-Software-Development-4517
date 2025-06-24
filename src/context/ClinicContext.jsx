import React, { createContext, useContext, useReducer, useEffect } from 'react';
import supabase from '../lib/supabase';

const ClinicContext = createContext();

const initialState = {
  patients: [],
  appointments: [],
  medicalRecords: [],
  bills: [],
  loading: false,
  error: null
};

function clinicReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_PATIENTS':
      return { ...state, patients: action.payload, loading: false };
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload, loading: false };
    case 'SET_MEDICAL_RECORDS':
      return { ...state, medicalRecords: action.payload, loading: false };
    case 'SET_BILLS':
      return { ...state, bills: action.payload, loading: false };
    case 'ADD_PATIENT':
      return { ...state, patients: [...state.patients, action.payload] };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.id === action.payload.id ? action.payload : patient
        )
      };
    case 'DELETE_PATIENT':
      return {
        ...state,
        patients: state.patients.filter(patient => patient.id !== action.payload)
      };
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] };
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(appointment =>
          appointment.id === action.payload.id ? action.payload : appointment
        )
      };
    case 'DELETE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.filter(appointment => appointment.id !== action.payload)
      };
    case 'ADD_MEDICAL_RECORD':
      return { ...state, medicalRecords: [...state.medicalRecords, action.payload] };
    case 'ADD_BILL':
      return { ...state, bills: [...state.bills, action.payload] };
    case 'UPDATE_BILL':
      return {
        ...state,
        bills: state.bills.map(bill =>
          bill.id === action.payload.id ? action.payload : bill
        )
      };
    default:
      return state;
  }
}

export function ClinicProvider({ children }) {
  const [state, dispatch] = useReducer(clinicReducer, initialState);

  // Load data from Supabase on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Load all data in parallel
      const [patientsRes, appointmentsRes, recordsRes, billsRes] = await Promise.all([
        supabase.from('patients_clinic2024').select('*').order('created_at', { ascending: false }),
        supabase.from('appointments_clinic2024').select('*').order('created_at', { ascending: false }),
        supabase.from('medical_records_clinic2024').select('*').order('created_at', { ascending: false }),
        supabase.from('bills_clinic2024').select('*').order('created_at', { ascending: false })
      ]);

      if (patientsRes.error) throw patientsRes.error;
      if (appointmentsRes.error) throw appointmentsRes.error;
      if (recordsRes.error) throw recordsRes.error;
      if (billsRes.error) throw billsRes.error;

      dispatch({ type: 'SET_PATIENTS', payload: patientsRes.data || [] });
      dispatch({ type: 'SET_APPOINTMENTS', payload: appointmentsRes.data || [] });
      dispatch({ type: 'SET_MEDICAL_RECORDS', payload: recordsRes.data || [] });
      dispatch({ type: 'SET_BILLS', payload: billsRes.data || [] });
    } catch (error) {
      console.error('Error loading data:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Enhanced actions with Supabase integration
  const actions = {
    // Patient actions
    addPatient: async (patientData) => {
      try {
        const { data, error } = await supabase
          .from('patients_clinic2024')
          .insert([patientData])
          .select()
          .single();
        
        if (error) throw error;
        dispatch({ type: 'ADD_PATIENT', payload: data });
        return data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    },

    updatePatient: async (patientData) => {
      try {
        const { data, error } = await supabase
          .from('patients_clinic2024')
          .update(patientData)
          .eq('id', patientData.id)
          .select()
          .single();
        
        if (error) throw error;
        dispatch({ type: 'UPDATE_PATIENT', payload: data });
        return data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    },

    deletePatient: async (patientId) => {
      try {
        const { error } = await supabase
          .from('patients_clinic2024')
          .delete()
          .eq('id', patientId);
        
        if (error) throw error;
        dispatch({ type: 'DELETE_PATIENT', payload: patientId });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    },

    // Appointment actions
    addAppointment: async (appointmentData) => {
      try {
        const { data, error } = await supabase
          .from('appointments_clinic2024')
          .insert([appointmentData])
          .select()
          .single();
        
        if (error) throw error;
        dispatch({ type: 'ADD_APPOINTMENT', payload: data });
        return data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    },

    updateAppointment: async (appointmentData) => {
      try {
        const { data, error } = await supabase
          .from('appointments_clinic2024')
          .update(appointmentData)
          .eq('id', appointmentData.id)
          .select()
          .single();
        
        if (error) throw error;
        dispatch({ type: 'UPDATE_APPOINTMENT', payload: data });
        return data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    },

    deleteAppointment: async (appointmentId) => {
      try {
        const { error } = await supabase
          .from('appointments_clinic2024')
          .delete()
          .eq('id', appointmentId);
        
        if (error) throw error;
        dispatch({ type: 'DELETE_APPOINTMENT', payload: appointmentId });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    },

    // Medical Record actions
    addMedicalRecord: async (recordData) => {
      try {
        const { data, error } = await supabase
          .from('medical_records_clinic2024')
          .insert([recordData])
          .select()
          .single();
        
        if (error) throw error;
        dispatch({ type: 'ADD_MEDICAL_RECORD', payload: data });
        return data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    },

    // Bill actions
    addBill: async (billData) => {
      try {
        const { data, error } = await supabase
          .from('bills_clinic2024')
          .insert([billData])
          .select()
          .single();
        
        if (error) throw error;
        dispatch({ type: 'ADD_BILL', payload: data });
        return data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    },

    updateBill: async (billData) => {
      try {
        const { data, error } = await supabase
          .from('bills_clinic2024')
          .update(billData)
          .eq('id', billData.id)
          .select()
          .single();
        
        if (error) throw error;
        dispatch({ type: 'UPDATE_BILL', payload: data });
        return data;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    }
  };

  return (
    <ClinicContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
}