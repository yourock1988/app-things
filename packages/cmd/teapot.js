export default {
  CL: {
    GET_ALL: 'teapot:cl:get_all',
    GET_BY_ID: 'teapot:cl:get_by_id',
    ADD: 'teapot:cl:add',
    UPD_BY_ID: 'teapot:cl:upd_by_id',
    DEL_BY_ID: 'teapot:cl:del_by_id',
    SHOW: 'teapot:cl:show',
    JOIN: 'teapot:cl:join',
    LEAVE: 'teapot:cl:leave',
    TURN_ON: 'teapot:cl:turn_on',
    TURN_OFF: 'teapot:cl:turn_off',
    TURN_DRAIN: 'teapot:cl:turn_drain',
  },
  SV: {
    SECRET_TEMPERATURE: 'teapot:sv:secret_temperature',
  },
  BC_CL: {
    ADDED: 'teapot:bc-cl:added',
    UPDATED: 'teapot:bc-cl:updated',
    DELETED: 'teapot:bc-cl:deleted',
    JOINED: 'teapot:bc-cl:joined',
    LEAVED: 'teapot:bc-cl:leaved',
    TURNED_ON: 'teapot:bc-cl:turned_on',
    TURNED_OFF: 'teapot:bc-cl:turned_off',
    TURNED_DRAIN: 'teapot:bc-cl:turned_drain',
  },
  BC_SV: {
    BOILED: 'teapot:bc-sv:boiled',
    DRAINED: 'teapot:bc-sv:drained',
    NO_POWER: 'teapot:bc-sv:no_power',
  },
}
