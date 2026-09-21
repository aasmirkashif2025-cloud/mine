import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { SiteConfig, Project, ServiceItem, IndustryItem, AgencyStatItem, InquiryItem } from '../types';

const SITE_DATA_DOC = 'main';
const SITE_DATA_COLLECTION = 'site_data';
const INQUIRIES_COLLECTION = 'inquiries';

export interface CloudSiteData {
  config?: SiteConfig;
  projects?: Project[];
  services?: ServiceItem[];
  industries?: IndustryItem[];
  stats?: AgencyStatItem[];
  updatedAt?: any;
}

// Real-time live listener for Site Data (projects, services, config, etc.)
export function subscribeCloudSiteData(
  onData: (data: CloudSiteData) => void,
  onError?: (err: any) => void
): () => void {
  try {
    const docRef = doc(db, SITE_DATA_COLLECTION, SITE_DATA_DOC);
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          onData(snapshot.data() as CloudSiteData);
        }
      },
      (err) => {
        console.warn('[Firebase] Real-time listener error:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    console.warn('[Firebase] Failed to attach listener:', err);
    return () => {};
  }
}

// Real-time live listener for inquiries (Admin CRM)
export function subscribeCloudInquiries(
  onData: (inquiries: InquiryItem[]) => void,
  onError?: (err: any) => void
): () => void {
  try {
    const colRef = collection(db, INQUIRIES_COLLECTION);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const results: InquiryItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          results.push({
            id: doc.id,
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            company: data.company || '',
            projectType: data.projectType || '',
            budget: data.budget || '',
            timeline: data.timeline || '',
            message: data.message || '',
            status: data.status || 'new',
            createdAt: data.createdAt || new Date().toISOString(),
          });
        });
        onData(results);
      },
      (err) => {
        console.warn('[Firebase] Inquiries listener error:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    console.warn('[Firebase] Failed to attach inquiries listener:', err);
    return () => {};
  }
}

// 1. Fetch Cloud Site Data
export async function getCloudSiteData(): Promise<CloudSiteData | null> {
  try {
    const docRef = doc(db, SITE_DATA_COLLECTION, SITE_DATA_DOC);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as CloudSiteData;
    }
    return null;
  } catch (err) {
    console.warn('[Firebase] Error fetching site data:', err);
    return null;
  }
}

// 2. Save entire or partial Cloud Site Data
export async function saveCloudSiteData(data: Partial<CloudSiteData>): Promise<boolean> {
  try {
    const docRef = doc(db, SITE_DATA_COLLECTION, SITE_DATA_DOC);
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('[Firebase] Error saving site data:', err);
    return false;
  }
}

// 3. Save Projects to Cloud
export async function syncProjectsToCloud(projects: Project[]): Promise<boolean> {
  try {
    const docRef = doc(db, SITE_DATA_COLLECTION, SITE_DATA_DOC);
    await setDoc(docRef, {
      projects,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('[Firebase] Error syncing projects to Firestore:', err);
    return false;
  }
}

// 4. Save Config to Cloud
export async function syncConfigToCloud(config: SiteConfig): Promise<boolean> {
  try {
    const docRef = doc(db, SITE_DATA_COLLECTION, SITE_DATA_DOC);
    await setDoc(docRef, {
      config,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('[Firebase] Error syncing config to Firestore:', err);
    return false;
  }
}

// 5. Submit Inquiry to Cloud Firestore
export async function submitCloudInquiry(inquiry: Omit<InquiryItem, 'id'>): Promise<string | null> {
  try {
    const colRef = collection(db, INQUIRIES_COLLECTION);
    const docRef = await addDoc(colRef, {
      ...inquiry,
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    console.error('[Firebase] Error submitting inquiry:', err);
    return null;
  }
}

// 6. Get All Inquiries from Cloud
export async function getCloudInquiries(): Promise<InquiryItem[]> {
  try {
    const colRef = collection(db, INQUIRIES_COLLECTION);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const results: InquiryItem[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      results.push({
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        company: data.company || '',
        projectType: data.projectType || '',
        budget: data.budget || '',
        timeline: data.timeline || '',
        message: data.message || '',
        status: data.status || 'new',
        createdAt: data.createdAt || new Date().toISOString(),
      });
    });
    return results;
  } catch (err) {
    console.warn('[Firebase] Error fetching inquiries:', err);
    return [];
  }
}

// 7. Update Inquiry Status
export async function updateCloudInquiryStatus(id: string, status: InquiryItem['status']): Promise<boolean> {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    await updateDoc(docRef, { status });
    return true;
  } catch (err) {
    console.error('[Firebase] Error updating inquiry status:', err);
    return false;
  }
}

// 8. Delete Inquiry
export async function deleteCloudInquiry(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error('[Firebase] Error deleting inquiry:', err);
    return false;
  }
}
