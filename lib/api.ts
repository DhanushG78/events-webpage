import { Stack } from './contentstack';

export const getEvents = async () => {
  try {
    const Query = Stack.ContentType('page').Query();
    const data = await Query.toJSON().find();
    return data[0] || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const getAuthors = async () => {
  try {
    const Query = Stack.ContentType('speaker').Query();
    const data = await Query.toJSON().find();
    return data[0] || [];
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
};

export const getSchedules = async () => {
  try {
    const Query = Stack.ContentType('schedule').Query();
    const data = await Query.includeReference(['speaker']).toJSON().find();
    return data[0] || [];
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return [];
  }
};

export const getAuthorByUid = async (uid: string) => {
  try {
    const Query = Stack.ContentType('speaker').Query();
    const data = await Query.where('uid', uid).toJSON().find();
    return data[0]?.[0] || null;
  } catch (error) {
    console.error('Error fetching author by uid:', error);
    return null;
  }
};

export const getEventBySlug = async (slug: string) => {
  try {
    const Query = Stack.ContentType('page').Query();
    const searchUrl = slug === 'home' ? '/' : `/${slug}`;

    const data = await Query
      .where('url', searchUrl)
      .includeReference([
        'modular_blocks.speaker_section.speakers',
        'modular_blocks.schedule_section.schedule_list',
        'modular_blocks.schedule_section.schedule_list.speaker'
      ])
      .toJSON()
      .find();

    return data[0]?.[0] || null;
  } catch (error) {
    console.error('Error fetching event by slug:', error);
    return null;
  }
};
