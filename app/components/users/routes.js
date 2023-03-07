import { router } from '../../router/index.js';



/// Get By Template UUID
router.get(
  '/v1/nutmaster',
  // AuthMiddleware.authenticate(), // TODO
  async (req, res, next) => {
    return res.status(200).json({ message: 'WE DID IT' });
  },
);
