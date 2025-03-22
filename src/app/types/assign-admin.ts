import admin from "firebase-admin";

interface ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(serviceAccount: ServiceAccount) {
  const privateKey = formatPrivateKey(serviceAccount.private_key);

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cred = admin.credential.cert({
    projectId: serviceAccount.project_id,
    privateKey: privateKey,
    clientEmail: serviceAccount.client_email,
  });

  return admin.initializeApp({
    credential: cred,
    databaseURL: "https://gender-based-violence-9eb1a-default-rtdb.firebaseio.com/",
  });
}

export async function initAdmin() {
  const serviceAccount: ServiceAccount = {
    type: "service_account",
    project_id: "gender-based-violence-9eb1a",
    private_key_id: "5259d8f6daefa019ecda8d7746c2dd76bbc2a3e1",
    private_key: process.env.FIREBASE_PRIVATE_KEY as string,
    client_email: "firebase-adminsdk-fbsvc@gender-based-violence-9eb1a.iam.gserviceaccount.com",
    client_id: "113353455614245825955",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40gender-based-violence-9eb1a.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  };

  return createFirebaseAdminApp(serviceAccount);
}

export async function assignAdminRole(uid: string) {
  const adminApp = await initAdmin();
  const db = adminApp.database();

  // Set the admin role in the Realtime Database
  await db.ref(`users/${uid}`).update({ role: "admin" });
}
