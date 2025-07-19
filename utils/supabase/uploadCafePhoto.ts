// utils/uploadCafePhoto.ts
import heic2any from 'heic2any';
import { createClient } from '@/utils/supabase/client'; // ← 追加

export const uploadCafePhoto = async (
  file: File
): Promise<string | null> => {
  try {
    const supabase = createClient(); // ← 外からもらわずに自分で用意！

    let uploadFile = file;

    // HEIC/HEIFの判定と変換
    const isHEIC =
      file.type.toLowerCase().includes('heic') ||
      file.type.toLowerCase().includes('heif') ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif');

    if (isHEIC) {
      const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg' });
      if (convertedBlob instanceof Blob) {
        uploadFile = new File([convertedBlob], file.name.replace(/\.\w+$/, '.jpg'), {
          type: 'image/jpeg',
        });
      } else {
        alert('HEIC変換に失敗しました');
        return null;
      }
    }

    const filePath = `admin/assets/${Date.now()}-${uploadFile.name}`;

    const { data, error } = await supabase.storage
      .from('cafe-photos')
      .upload(filePath, uploadFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('❌ Supabase upload error:', error.message);
      return null;
    }

    const publicUrl = supabase.storage.from('cafe-photos').getPublicUrl(filePath).data.publicUrl;
    return publicUrl;
  } catch (err) {
    console.error('❌ Upload failed:', err);
    return null;
  }
};

