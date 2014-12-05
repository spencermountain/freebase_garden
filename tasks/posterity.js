//record things that have been done, for posterity

var obj = {
    cat: "Category:Theatrical genres",
    key: CREDENTIALS.API_KEY,
    access_token: CREDENTIALS.WRITE_TOKEN,
    depth: 1,
    filter: {
        not_types: ["/theater/play"]
    },
    write: {
        type: "/theater/theater_genre"
    }
}

var obj = {
    cat: "Category:Television_genres",
    key: CREDENTIALS.API_KEY,
    access_token: CREDENTIALS.WRITE_TOKEN,
    depth: 1,
    filter: {
        not_types: ["/tv/tv_program"]
    },
    write: {
        type: "/tv/tv_genre"
    }
}

// exports.write_list(list, "/transportation/bridge", console.log)

list= [
       'Attock Bridge',
       'Ayub Bridge',
       'Kotri Bridge',
       'Raikot Bridge',
       'King Abdullah Bridge' ,
       'Kyaka Bridge',
       'Rusumo Bridge',
       'Rusumo International Bridge',
       'Butchers\' Bridge',
       'Fabiani Bridge',
       'Hradecky Bridge',
       'St. James\'s Bridge',
       'St. Peter\'s Bridge',
       'Prule Bridge',
       'Ljubljanica Sluice Gate',
       'Fourth Thai–Lao Friendship Bridge',
       'Rạch Miễu Bridge',
       'Third Thai–Lao Friendship Bridge',
       'Dongpingshuidao Bridge',
       'Hedong Bridge',
       'Hong Kong–Zhuhai–Macau Bridge',
       'Shenzhen-Zhongshan Bridge',
       'Xinguang Bridge',
       'Yajisha Bridge' ,
       'Hamm Railway Bridge',
       'Haus-Knipp railway bridge',
                      'Pont de Neuilly',
       'Pont de Sèvres',
       'Pont de Saint-Cloud',
       'Pont du Carrousel',
       'Pont au Change',
       'Port à l\'Anglais Bridge',
       'Pont Rouelle' ,
       'Lezíria Bridge',
       '14th of July Bridge',
       'Branický most',
       'Franz Joseph Bridge',
       'Palacký Bridge',
       'Troja Bridge',
       'Žďákov Bridge',

       'Anqing Bridge',
       'Anqing Railway Bridge',
       'Badong Bridge',
       'Baishatuo Railway Bridge',
       'Bosideng Bridge',
       'Caiyuanba Bridge',
       'Changshou Bridge',
       'Changshou Railway Bridge',
       'Dafosi Bridge',
       'Dashengguan Bridge',
       'Dingshan Bridge',
       'Diwei Bridge',
       'Edong Bridge',
       'Ehuang Bridge',
       'Erqi Bridge',
       'Fengjie Bridge',
       'Fourth Nanjing Yangtze Bridge',
       'Fuling Yangtze River Bridge',
       'Guanyinyan Bridge',
       'Hanjiatuo Bridge',
       'Hejiang Bridge',
       'Huangshi Bridge',
       'Jingyue Bridge',
       'Jingzhou Yangtze River Bridge',
       'Jiujiang Fuyin Expressway Bridge',
       'Lidu Bridge',
       'Lijiatuo Bridge',
       'Ma\'anshan Bridge',
       'Masangxi Bridge',
       'Nanxi Bridge',
       'Second Nanjing Yangtze Bridge',
       'Second Wanxian Bridge',
       'Shanghai Yangtze River Tunnel and Bridge',
       'Shibangou Bridge',
       'Taizhou Bridge',
       'Tongling Bridge',
       'Wanzhou Railway Bridge',
       'Wuhan Junshan Yangtze River Bridge',
       'Wushan Yangtze River Bridge',
       'Yichang Railway Bridge',
       'Yingwuzhou Bridge',
       'Yunyang Bridge',
       'Yuzui Yangtze River Bridge',
       'Zhicheng Bridge',
       'Zhongxian Huyu Expressway Bridge',
       'Zhongxian Yangtze River Bridge' ,
       'Armando Emilio Guebuza Bridge',
       'Benga Bridge',
       'Samora Machel Bridge'


       ]

exports.inspect_categories({cat:"Category:Hospitals_by_city", type:"/medicine/hospital"}, console.log)
exports.inspect_categories({cat:"Category:Hospitals_by_medical_condition", type:"/medicine/hospital"}, console.log)
exports.inspect_categories({cat:"Category:Children's hospitals by country", type:"/medicine/hospital"}, console.log)
