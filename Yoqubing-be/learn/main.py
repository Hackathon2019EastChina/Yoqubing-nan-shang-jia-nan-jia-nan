#-*- coding:utf-8 -*-
import os
import io
from surprise import KNNBaseline
from surprise import Dataset
from surprise import Reader
import logging
import sys
def getSimModle(file_path):
    reader = Reader(line_format="user item rating", sep ="|")  # 分隔符为空白键
    data = Dataset.load_from_file(file_path, reader=reader)
    trainset = data.build_full_trainset()
    sim_options = {"name":'pearson_baseline','usr_based':False}
    algo = KNNBaseline(sim_options=sim_options)
    algo.fit(trainset)
    return algo

def read_item_names(file_name):
    print(os.path)
    type_to_uid = {}
    uid_to_type = {}
    with io.open(file_name,'r',encoding = 'ISO-8859-1') as f:
        for line in f:
            line = line.split("|")
            uid_to_type[line[0]] = line[1]
            type_to_uid[line[1]] = line[0]
    return uid_to_type, type_to_uid

def showSimilarMovies(algo, uid_to_type, type_to_uid):
    print(type_to_uid)
    type1_uid = type_to_uid["3"]
    logging.debug('raw_id='+type1_uid)

    type1_inner_uid = algo.trainset.to_inner_iid(type1_uid)
    logging.debug('inner_id = '+str(type1_inner_uid))

    type1_neighbors = algo.get_neighbors(type1_inner_uid,2)
    logging.debug("neighbors_id = " + str(type1_neighbors))

    neighbors_raw_ids = [algo.trainset.to_raw_iid(inner_id) for inner_id in type1_neighbors]
    neighbors_movies = [uid_to_type[raw_id ] for raw_id in neighbors_raw_ids]
    print('The 2 nearest_neighbors of 3 are:')
    for movie in neighbors_movies:
        print(movie)

if __name__ == '__main__':
    file_name = sys.argv[1];# "D:/basic/data.txt"
    uid_to_type,type_to_uid = read_item_names(file_name)

    algo = getSimModle(file_name)

    showSimilarMovies(algo,uid_to_type,type_to_uid)