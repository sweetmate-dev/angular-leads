import {ResolvesSession, Resolves} from './resolves.model';
import _ from 'lodash';
import future from 'bluebird';

future.promisifyAll(Resolves);
future.promisifyAll(Resolves.prototype);
future.promisifyAll(ResolvesSession);
future.promisifyAll(ResolvesSession.prototype);

export const $param = (req, res, next, id)=> {
  ResolvesSession.findById(id)
  .populate({
    path: 'resolves',
    select: 'lead dupe'
  })
  .then(resolve => {
    req.resolution = resolve;
    next();
  })
  .catch(e => {
    next(e);
  });
};

export const $get = (req, res, next)=> {
  Resolves.findAsync()
    .then(resolves => {
      req.json(resolves);
    })
    .catch(next.bind.next);
};

export const $getOne = (req, res, next)=> {
  res.json(req.resolution);
};

export const $post = (req, res, next)=> {

};

export const $put = (req, res, next)=> {

};

export const $destroy = (req, res, next)=> {
  Resolves.findByIdAndRemoveAsync(req.resolution._id)
  .then(resolution => {
    res.json(resolution);
  })
  .catch(e => {
    next(e);
  });
};
